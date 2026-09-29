from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import FRONTEND_URL

from app.api.analyze import router as analyze_router
from app.api.generate import router as generate_router
from app.api.callbacks import router as callbacks_router


app = FastAPI(
    title="Fashion Image Editor API"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        FRONTEND_URL
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.mount(
    "/storage",
    StaticFiles(directory="storage"),
    name="storage",
)


app.include_router(
    analyze_router
)

app.include_router(
    generate_router
)

app.include_router(
    callbacks_router
)


@app.get("/health")
def health():
    return {
        "status": "ok"
    }