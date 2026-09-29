import json
import uuid
from pathlib import Path

from fastapi import (
    APIRouter,
    File,
    Form,
    UploadFile,
    HTTPException,
)

from app.services.vision import (
    generate_fashion_prompt,
)


router = APIRouter(
    prefix="/api/analyze",
    tags=["Analysis"],
)


STORAGE_DIR = Path("storage")
STORAGE_DIR.mkdir(exist_ok=True)


@router.post("")
async def analyze_image(
    image: UploadFile = File(...),
    locked_colors: str = Form(...),
):

    if not image.content_type:
        raise HTTPException(
            status_code=400,
            detail="Image content type is missing.",
        )

    if not image.content_type.startswith(
        "image/"
    ):
        raise HTTPException(
            status_code=400,
            detail="Only image files are supported.",
        )

    try:
        colors = json.loads(
            locked_colors
        )
    except json.JSONDecodeError:
        colors = [
            color.strip()
            for color in locked_colors.split(",")
            if color.strip()
        ]

    if not isinstance(colors, list):
        raise HTTPException(
            status_code=400,
            detail="locked_colors must be an array.",
        )

    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty.",
        )

    image_id = str(uuid.uuid4())

    extension = (
        image.filename.split(".")[-1]
        if image.filename and "." in image.filename
        else "jpg"
    )

    file_path = (
        STORAGE_DIR
        / f"{image_id}.{extension}"
    )

    file_path.write_bytes(image_bytes)

    generated_prompt = (
        await generate_fashion_prompt(
            image_bytes=image_bytes,
            content_type=image.content_type,
            locked_colors=colors,
        )
    )

    return {
        "image_id": image_id,
        "image_url": (
            f"/storage/{image_id}.{extension}"
        ),
        "filename": (
            f"{image_id}.{extension}"
        ),
        "locked_colors": colors,
        "prompt": generated_prompt,
    }