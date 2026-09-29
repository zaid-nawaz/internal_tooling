import base64
import requests

from app.core.config import ASTRIA_API_KEY


ASTRIA_BASE_URL = "https://api.astria.ai"


def generate_images(
    *,
    model_id: int,
    prompt: str,
    image_bytes: bytes,
    content_type: str,
    num_images: int,
    callback_url: str,
    aspect_ratio: str,
    resolution: str | None = None,
):
    if not 1 <= num_images <= 8:
        raise ValueError(
            "num_images must be between 1 and 8"
        )

    image_base64 = base64.b64encode(
        image_bytes
    ).decode("utf-8")

    image_data_url = (
        f"data:{content_type};base64,{image_base64}"
    )

    url = (
        f"{ASTRIA_BASE_URL}"
        f"/tunes/{model_id}/prompts"
    )

    headers = {
        "Authorization": f"Bearer {ASTRIA_API_KEY}",
    }

    data = {
        "prompt[text]": prompt,
        "prompt[num_images]": str(num_images),
        "prompt[callback]": callback_url,
        "prompt[aspect_ratio]": aspect_ratio,
        "prompt[input_image_base64]": image_data_url,
        "prompt[film_grain]": "false",
    }

    if resolution:
        data["prompt[resolution]"] = resolution

    response = requests.post(
        url,
        headers=headers,
        data=data,
        timeout=120,
    )

    if not response.ok:
        print("ASTRIA STATUS:", response.status_code)
        print("ASTRIA RESPONSE:", response.text)

        raise RuntimeError(
            f"Astria API error "
            f"{response.status_code}: "
            f"{response.text}"
        )

    return response.json()