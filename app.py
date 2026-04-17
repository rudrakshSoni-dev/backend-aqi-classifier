from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import cv2
from skimage.segmentation import slic
from skimage.color import label2rgb
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = FastAPI()

# Add CORS middleware to allow communication with the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the local original model
model = tf.keras.models.load_model("aqi_model.keras")

classes = [
    "GOOD",
    "MODERATE",
    "UNHEALTHY FOR SENSITIVE PEOPLE",
    "UNHEALTHY",
    "VERY UNHEALTHY",
    "SEVERE"
]

def create_saturation(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    hsv[:, :, 1] = cv2.equalizeHist(hsv[:, :, 1])
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)

def create_superpixel(img):
    segments = slic(img, n_segments=30, compactness=5)
    sp_img = label2rgb(segments, img, kind='avg')
    return (sp_img * 255).astype(np.uint8)

def preprocess_all(image):
    image = image.resize((224, 224))
    image = np.array(image).astype("uint8")

    sat = create_saturation(image)
    sp  = create_superpixel(image)

    orig = preprocess_input(image.astype("float32"))
    sat  = preprocess_input(sat.astype("float32"))
    sp   = preprocess_input(sp.astype("float32"))

    orig = np.expand_dims(orig, axis=0)
    sat  = np.expand_dims(sat, axis=0)
    sp   = np.expand_dims(sp, axis=0)

    return orig, sat, sp

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    orig, sat, sp = preprocess_all(image)

    prediction = model.predict([orig, sat, sp])

    class_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    return {
        "label": classes[class_index],
        "confidence": confidence
    }

@app.get("/")
async def root():
    return {"status": "AQI Vision Local Model is running"}
