from fastapi import APIRouter, Request


router = APIRouter(
    prefix="/api/callbacks",
    tags=["Callbacks"],
)


GENERATIONS = {}


@router.post("/astria")
async def astria_callback(
    request: Request,
):
    generation_id = request.query_params.get(
        "generation_id"
    )

    data = await request.json()

    print("Astria callback received:")
    print(data)

    if generation_id:
        GENERATIONS[generation_id] = {
            "status": "completed",
            "data": data,
        }

    return {
        "status": "received"
    }
    
@router.get("/astria/{generation_id}")
async def get_generation(
    generation_id: str,
):
    generation = GENERATIONS.get(
        generation_id
    )

    if not generation:
        return {
            "status": "processing",
        }

    return generation