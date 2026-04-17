# AQI Vision

AQI Vision is an AI-powered application designed to estimate the Air Quality Index (AQI) from photos. By leveraging deep learning and image processing techniques, it provides a visual-based assessment of air pollution levels.

## 🚀 Features

- **Image-Based Prediction:** Upload a photo of the sky or environment to get an instant AQI estimation.
- **Advanced Image Preprocessing:** Uses saturation enhancement and superpixel segmentation to improve model accuracy.
- **Multi-Input Deep Learning:** Employs a Keras model (`aqi_model.keras`) that processes original, saturated, and superpixel versions of the image.
- **Modern UI:** A responsive and interactive frontend built with Next.js and Framer Motion.
- **Health Advice:** Provides health recommendations based on the predicted AQI category.

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI
- **AI/ML:** TensorFlow, Keras, NumPy
- **Image Processing:** OpenCV, Pillow, Scikit-image
- **Server:** Uvicorn

### Frontend
- **Framework:** Next.js 15+ (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (recommended for Python package management)

### 1. Backend Setup
Navigate to the root directory:
```bash
# Create a virtual environment and install dependencies
uv sync

# Run the FastAPI server
uv run uvicorn app:app --reload
```
The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## 🧠 Model Information

The model classifies images into six categories:
1. **GOOD**
2. **MODERATE**
3. **UNHEALTHY FOR SENSITIVE PEOPLE**
4. **UNHEALTHY**
5. **VERY UNHEALTHY**
6. **SEVERE**

It uses a multi-stream approach, taking three inputs derived from a single image:
- **Original:** The raw resized image.
- **Saturation:** Color-enhanced image to highlight atmospheric haze.
- **Superpixel:** Segmented image to capture structural patterns in the sky.

## 📂 Project Structure

```
AQI_project/
├── app.py              # FastAPI application & ML logic
├── aqi_model.keras     # Trained Keras model
├── pyproject.toml      # Python dependencies
├── frontend/           # Next.js frontend application
│   ├── src/app/        # Next.js pages and layouts
│   ├── src/components/ # Reusable React components
│   └── package.json    # Frontend dependencies
└── README.md           # Project documentation
```

## 📝 License
[MIT License](LICENSE)
