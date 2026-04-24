FROM python:3.12-slim

# install system deps for opencv
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libxcb1 \
    && rm -rf /var/lib/apt/lists/*

# install uv
RUN pip install --no-cache-dir uv

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --no-dev

COPY . .

RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]