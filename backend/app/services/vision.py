import base64

from openai import AsyncOpenAI

from app.core.config import OPENAI_API_KEY
from app.services.prompt_builder import (
    build_analysis_instruction,
)


client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENAI_API_KEY,
    timeout=120.0,
    max_retries=2,
)


def image_to_data_url(
    image_bytes: bytes,
    content_type: str,
) -> str:

    encoded = base64.b64encode(
        image_bytes
    ).decode("utf-8")

    return (
        f"data:{content_type};base64,{encoded}"
    )


async def generate_fashion_prompt(
    image_bytes: bytes,
    content_type: str,
    locked_colors: list[str],
) -> str:

    instruction = build_analysis_instruction(
        locked_colors
    )

    image_data_url = image_to_data_url(
        image_bytes,
        content_type,
    )

    response = await client.chat.completions.create(

        model="openai/gpt-5",

        messages=[
            {
                "role": "user",

                "content": [
                    {
                        "type": "text",
                        "text": instruction,
                    },

                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_data_url,
                        },
                    },
                ],
            }
        ],
    )

    return response.choices[0].message.content.strip()