import os

from dotenv import load_dotenv

load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ASTRIA_API_KEY = os.getenv("ASTRIA_API_KEY")

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:3000",
)

BACKEND_URL = os.getenv(
    "BACKEND_URL",
    "http://localhost:8000",
)


if not OPENAI_API_KEY:
    raise RuntimeError(
        "OPENAI_API_KEY is not configured"
    )

if not ASTRIA_API_KEY:
    raise RuntimeError(
        "ASTRIA_API_KEY is not configured"
    )