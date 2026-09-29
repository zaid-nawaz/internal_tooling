from pathlib import Path


FORMULA_PATH = (
    Path(__file__).resolve().parents[2]
    / "prompts"
    / "fashion_formula.md"
)


def load_fashion_formula() -> str:
    if not FORMULA_PATH.exists():
        raise FileNotFoundError(
            f"Fashion formula not found: {FORMULA_PATH}"
        )

    return FORMULA_PATH.read_text(
        encoding="utf-8"
    )


def build_analysis_instruction(
    locked_colors: list[str],
) -> str:

    formula = load_fashion_formula()

    colors = ", ".join(locked_colors)

    return f"""
You are an expert luxury fashion photography
and image-editing prompt engineer.

You are given:

1. A PRIMARY IMAGE.
2. A set of LOCKED HEX COLORS.
3. A fashion prompt formula that must be followed.

LOCKED COLORS:
{colors}

The locked colors are important campaign colors.

Analyze the PRIMARY IMAGE carefully.

Determine:

- garment type
- garment silhouette
- fabric
- visible texture
- color
- embroidery
- construction
- neckline
- sleeves
- cuffs
- hem
- accessories
- footwear
- model identity characteristics
- hairstyle
- expression
- body proportions
- pose
- hands
- legs
- gaze
- camera position
- composition
- subject scale
- existing environment
- lighting
- visual mood

Do NOT invent details that cannot reasonably be seen.

The PRIMARY IMAGE is the source of truth for
the garment, person, identity, pose and composition.

The locked colors should be incorporated into
the BACKGROUND / campaign environment where
appropriate.

Do NOT recolor the garment merely to use a
locked color.

Now generate ONE complete production-ready
prompt using the exact 1–7 structure contained
in the supplied fashion formula.

The output must contain:

1. GARMENT LOCK
2. MODEL / IDENTITY LOCK
3. BACKGROUND
4. LIGHTING
5. CAMERA / COMPOSITION
6. MOOD / BRAND
7. OUTPUT FORMAT

The prompt should be written for a professional
luxury fashion image generation/editing system.

Do not explain your reasoning.

Return ONLY the final prompt.

Here is the fashion formula:

---------------- FORMULA ----------------

{formula}

-------------- END FORMULA --------------
"""