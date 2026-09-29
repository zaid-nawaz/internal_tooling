from pathlib import Path

from fastapi import (
    APIRouter,
    Form,
    HTTPException,
)

from app.services.astria import generate_images

from uuid import uuid4




router = APIRouter(
    prefix="/api/generate",
    tags=["Generation"],
)


STORAGE_DIR = Path("storage")


MODELS = {
    "3159068": {
        "name": "Nano Banana",
        "description": "Gemini 2.5 Flash",
        "aspect_ratio": "4:5",
        "resolution": None,
    },

    "1504944": {
        "name": "FLUX.1 Dev",
        "description": "FLUX.1 Dev",
        "aspect_ratio": "3:4",
        "resolution": None,
    },

    "4180298": {
        "name": "Nano Banana 2",
        "description": "Next-generation image generation",
        "aspect_ratio": "3:4",
        "resolution": "1K",
    },

    "5236038": {
        "name": "Seedream 5.0 Pro",
        "description": "High-quality fashion image generation",
        "aspect_ratio": "4:5",
        "resolution": "1K",
    },

    "5605622": {
        "name": "Muse Image",
        "description": "Creative image generation",
        "aspect_ratio": "3:4",
        "resolution": None,
    },

    "5634510": {
        "name": "GPT Image 2.5 Sunburst",
        "description": "High-quality hero image generation",
        "aspect_ratio": "4:5",
        "resolution": "1K",
    },

    "5634511": {
        "name": "GPT Image 2.5 Flare",
        "description": "High-quality image generation",
        "aspect_ratio": "3:4",
        "resolution": "1K",
    },
}


@router.post("")
async def generate(
    image_id: str = Form(...),
    prompt: str = Form(...),
    model: str = Form(...),
    num_images: int = Form(...),
):
    
    generation_id = str(uuid4())
    
    if model not in MODELS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported model.",
        )

    if not 1 <= num_images <= 8:
        raise HTTPException(
            status_code=400,
            detail="Number of images must be between 1 and 8.",
        )

    matches = list(
        STORAGE_DIR.glob(
            f"{image_id}.*"
        )
    )

    if not matches:
        raise HTTPException(
            status_code=404,
            detail="Original image not found.",
        )

    image_path = matches[0]

    image_bytes = image_path.read_bytes()

    suffix = image_path.suffix.lower()

    content_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
    }

    content_type = content_types.get(
        suffix,
        "image/jpeg",
    )

    model_config = MODELS[model]

    callback_url = (
        "https://endosporously-cozies-jannette.ngrok-free.dev"
        f"/api/callbacks/astria?generation_id={generation_id}"
    )

    result = generate_images(
        model_id=int(model),
        prompt=prompt,
        image_bytes=image_bytes,
        content_type=content_type,
        num_images=num_images,
        callback_url=callback_url,
        aspect_ratio=model_config["aspect_ratio"],
        resolution=model_config["resolution"],
    )
    
    print("========== ASTRIA RESULT ==========")
    print(result)
    print("===================================")

    return {
        "status": "processing",
        "generation_id": generation_id,
        "model": model,
        "model_name": model_config["name"],
        "num_images": num_images,
        "astria": result,
    }