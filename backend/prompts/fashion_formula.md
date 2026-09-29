The Industry-Standard Fashion Prompt Formula
A reusable architecture:
1. GARMENT LOCK (Garment description with fabric texture) → 2. MODEL LOCK (Model details & pose) → 3. BACKGROUND (Background Setting Details) → 4. LIGHTING (Lighting Type & direction) → 5. CAMERA (shot type/camera angle)→ 6. MOOD/BRAND (technical style parameter) → 7. OUTPUT FORMAT
Background Library:  Luxury Indian Architecture / Modern Delhi Luxury / European Luxury / Resort / Minimal Studio / Heritage / Urban International / Evening Luxury / Corporate Luxury / Festive / Bridal / Indo-Western Editorial.
1. The High-End Luxury Lookbook (Studio Vibe)
Ideal for formal wear, evening gowns, and bespoke tailoring. Focuses on minimal, elegant backgrounds that keep the focus entirely on the dress.
Full-body editorial fashion photography of a poised female model wearing [insert garment, e.g., a structured ivory silk dress with visible fabric folds]. Relaxed standing pose, positioned against a seamless warm gray studio concrete wall backdrop. Softbox lighting from the left creating gentle shadows, sharp focus on fabric texture, 85mm lens look, Vogue-inspired clean composition, minimalist luxury brand aesthetic --ar 4:5 --style raw


GARMENT LOCK
Preserve the exact garment without redesign or reinterpretation.
Deep burgundy floor-length embroidered evening dress.
Velvet-like fabric texture with gold thread embroidery...
[actual details from photograph]

MODEL LOCK
Preserve exact model identity, facial features, body proportions,
hairstyle, jewelry, expression and existing pose...

BACKGROUND
Contemporary five-star Delhi hotel terrace,
subtle sandstone architecture, elegant landscaping,
minimal visual clutter, no visible logos...

LIGHTING
Warm late-afternoon directional light from camera left,
soft realistic shadows...

CAMERA
Preserve original full-body framing and camera perspective...

MOOD / BRAND
International luxury fashion campaign,
sophisticated Indian contemporary aesthetic,
restrained editorial styling...


Use Image 1 as the primary subject. Preserve the exact person, face, outfit, pose, body proportions, hands, accessories, and garment details from Image 1. Use Image 2 only as the reference for the 1970s Italian luxury hotel environment, color palette, materials, lighting, and overall Ogle campaign aesthetic. Do not copy the pose, body position, face, or framing from Image 2.

<faceid:5750235:1.0> outfit GARMENT LOCK
Preserve the exact teal/emerald-green dress from the reference photograph. Preserve the exact color, flowing silhouette, gathered/smocked upper yoke, neckline, voluminous long sleeves, gathered cuffs, small light-colored sleeve motifs, subtle vertically textured fabric appearance, natural folds, drape, garment length and construction. Do not redesign, restyle, embellish, simplify or reinterpret the garment. Preserve the exact tan platform block-heel sandals and visible jewelry.
MODEL LOCK
Preserve the exact woman from the reference photograph: facial features, natural skin appearance, expression, hairstyle, hair length, body proportions and existing seated pose. Preserve the exact position of the arms, hands, crossed/folded legs, feet and gaze. Do not reshape, beautify, reposition or regenerate . Do not change the face of the subject. Keep the same person in the image, same face.
BACKGROUND
Replace only the existing environment with a sophisticated 1970s Italian luxury hotel lounge. Create an elegant, high-end interior inspired by vintage Milan and Rome hospitality design, using sculptural furniture, cream travertine or polished stone, refined brass detailing, curved architectural forms, and premium upholstery.
Incorporate the palette naturally and selectively:
- soft apricot velvet inspired by #F49E4C
- muted blush walls or upholstery inspired by #EFAAC4
- deep terracotta accents inspired by #AB3428
- pale cream/champagne stone and surfaces inspired by #F5EE9E
The environment should feel expensive, sophisticated, sensual, and editorial rather than retro-themed or kitschy. Use the colors as restrained interior-design elements, not large saturated blocks. Include elegant lounge seating, architectural curves, subtle art, brass accents, and premium stone surfaces. Avoid busy patterns, obvious 1970s clichés, excessive orange, hotel branding, signage, crowds, or clutter. The teal-green outfit must remain the primary visual focus.
LIGHTING
Use soft, cinematic late-afternoon interior lighting with natural directional window light from front-left and subtle warm practical lamps in the background. Maintain accurate natural skin tones and preserve the true teal-green color of the garment.
Add gentle highlights across the dress folds and fabric texture, soft realistic shadows, restrained contrast, and subtle dimensional light on the model. Background lighting should complement the apricot, blush, cream, brass, and terracotta interior without casting those colors onto the model or changing the garment color.
The overall lighting should feel luxurious, intimate, polished, and editorial. Avoid harsh flash, heavy orange color casts, overly dark nightclub lighting, flat commercial illumination, or excessive glow.
CAMERA
Preserve the original camera position, seated three-quarter fashion composition, perspective and proportions. Professional luxury fashion editorial photography. Full seated pose and footwear remain visible. Model and garment sharp; luxury hotel background slightly softer with natural shallow-to-moderate depth of field. Do not change the pose or simulate a different camera angle.
MOOD / BRAND — OGLE
High-end contemporary women's fashion with confident, understated sensuality. Affluent, self-assured, sophisticated and effortlessly desirable. Create the feeling of a private luxury lifestyle: exclusive, elegant, modern and aspirational. The viewer should imagine herself wearing a unique one-of-one Ogle creation in an upscale social environment. Editorial realism, refined materials, controlled contrast and sophisticated premium color grading. Avoid mass-market catalog styling, artificial glamour effects, over-retouched skin, excessive gold décor or flashy displays of wealth. The garment must feel rare and individually designed rather than mass-produced.
OUTPUT FORMAT
Vertical 4:5 luxury-fashion image optimized for Instagram feed. Preserve the complete seated pose and footwear; expand the environment horizontally if necessary rather than cropping the subject. Photorealistic, high detail, natural fabric texture, professional commercial fashion quality. No text, captions, logos or watermarks.




Overall Design Workflow and Architecture for Astria

1. Create one Ogle Workspace
In Astria, look at the top-right workspace selector. Astria's current interface lets you switch or create a workspace there. Create:
OGLE Fashion
That's the container for this entire client/brand. Don't create a separate workspace for every dress. Astria specifically recommends organizing the workspace around the brand and keeping the models, products, locations, prompts, outputs, and review decisions together. Astria
2. Add a color-palette stage before our 1–7 prompt

ORIGINAL OUTFIT PHOTO
        ↓
COOLORS
        ↓
GARMENT ANCHOR COLOR
        ↓
CAMPAIGN COLOR PALETTE
        ↓
BACKGROUND FAMILY
        ↓
1–7 ASTRIA SPECIFICATION
Your Coolors process becomes standardized:
Upload the original outfit photograph to Coolors → use Image Picker to identify the principal garment color → record the HEX value → lock that color → generate candidate palettes → select the palette appropriate to the desired campaign treatment.
Coolors currently provides both the Image Picker and palette-generator workflow, so this is a sensible external tool to keep in front of Astria. Coolors

3. Separate Background from Color Palette
So we create two independent reusable modules:
BACKGROUND:
BG-14 = 1970s Italian Luxury Hotel

COLOR PALETTE:
PAL-001 = Green Dress Campaign
#F5EE9E
#F49E4C
#AB3428
#EFAAC4
Then #3 combines them:
3. BACKGROUND
Background Family: BG-14
Palette: PAL-001
This is much more scalable.
For another garment:
BG-14 1970s Italian Hotel
+
PAL-008 Black Dress Palette
Same environment concept, completely different color treatment.
4. Create one Astria Board called OGLE Background Library
Astria's Board is probably the easiest place for you to manage your library visually. Astria describes it as an infinite canvas where you can place references, generations, prompts, compare shots, and turn successful shots into templates. Astria
Inside that Board, create areas/rows for:
Luxury Indian Architecture

Modern Delhi Luxury

European Luxury

Resort

Minimal Studio

Heritage

Urban International

Evening Luxury

Corporate Luxury

Festive

Bridal

Indo-Western Editorial

Mediterranean Luxury Boutique Hotel

1970s Italian Luxury Hotel
You don't need to populate all 14 immediately.
Only add a background when we have actually developed and approved one.
Right now we have one genuine candidate:
BG-14 — 1970s Italian Luxury Hotel
5. Each approved background gets its own reusable specification
For example:
BG-14 — 1970s Italian Luxury Hotel
Store:
BACKGROUND DESCRIPTION
1970s Italian luxury boutique hotel...

DEFAULT MATERIALS
Travertine
Brass
Velvet
Textured plaster

ARCHITECTURAL LANGUAGE
Arches
Curved furniture
Sculptural forms
Premium stone

AVOID
Kitsch
Heavy orange
Busy patterns
Hotel branding
Tourist-resort appearance

LIGHTING FAMILY
Soft late-afternoon directional light
Warm practical lamps
Controlled contrast
But do not store the green-dress color palette permanently inside BG-14.
Instead attach:
Current Palette → PAL-001
6. Our 1–7 system 
Step
Rule
1. Garment Lock
Derived from current original photograph
2. Model Lock
Derived from current photograph + identity reference
3. Background
Select Background ID + Palette ID
4. Lighting
Appropriate lighting for selected environment
5. Camera
Preserve original composition unless intentionally changed
6. Mood / Brand
Ogle master brand specification
7. Output Format
Instagram-safe / final 4:5

So #3 might literally begin:
BACKGROUND FAMILY: BG-14 — 1970s Italian Luxury Hotel
COLOR PALETTE: PAL-001 — Green Dress Campaign
Supporting colors: #F5EE9E, #F49E4C, #AB3428, #EFAAC4.
Then the prose follows.
7. After a hero image works, create an Astria Template
This is where Astria becomes reusable rather than just being an image generator.
Your current process is:
Original Outfit
      ↓
Coolors
      ↓
Choose BG + Palette
      ↓
1–7 Prompt
      ↓
SUNBURST
      ↓
Hero Image
      ↓
Human Approval
      ↓
SAVE AS TEMPLATE
Astria explicitly recommends that workflow: experiment first, then turn only the approved prompts/settings into templates. Its latest interface keeps Generate, Templates, and Workspaces together, and saved generation settings include things such as model, aspect ratio, resolution, and output count. Astria
For this campaign I'd name the template something simple like:
OGLE_BG14_ItalianHotel_PAL001_v1





Then Seedream uses that approved visual world for Poses 2–5.
The full Ogle ecosystem is now
            ORIGINAL OGLE PHOTO
                     │
                     ▼
                  COOLORS
                     │
          Garment Anchor HEX
                     │
             Campaign Palette
                     │
                     ▼
          BACKGROUND LIBRARY
             BG-01 ... BG-14
                     │
                     ▼
            OGLE 1–7 SYSTEM
                     │
       ┌─────────────┴─────────────┐
       │                           │
       ▼                           ▼
GPT Image 2.5 Sunburst       Approved Hero
  creates first look              │
                                  ▼
                           Astria Template
                                  │
                                  ▼
                           Seedream 5 Pro
                           poses 2 / 3 / 4 / 5
                                  │
                                  ▼
                                 QA
                                  │
                                  ▼
                         Instagram 4:5 Final

OGLE — Astria Fashion Background System v1.0
A. Fixed production workflow
                OGLE ORIGINAL PHOTO
                         │
                         ▼
              COOLORS
                         │
             Garment Anchor HEX
                         │
               Campaign Palette
                         │
                        ▼
          BACKGROUND LIBRARY
             BG-01 ... BG-14
                         │
                        ▼

              1. GARMENT LOCK
                         │
              2. MODEL / FACE LOCK
                         │
              3. BACKGROUND LIBRARY
                         │
              4. LIGHTING
                         │
              5. CAMERA / COMPOSITION
                         │
              6. OGLE MOOD / BRAND
                         │
              7. OUTPUT FORMAT
                         │
                         ▼
                 ASTRIA GENERATION
                  /              \
                 /                \
        FIRST / HERO IMAGE     POSES 2–5
       GPT 2.5 SUNBURST      SEEDREAM 5 PRO
              │                    │
              │                    │
              └────────┬───────────┘
                       ▼
                     QA
                       │
                PASS / CORRECT
                       │
                       ▼
                 FINAL 4:5 IMAGE


B. The reusable 1–7 master instruction
This becomes the master, not something we reinvent for every photograph.
1. GARMENT LOCK — FIXED RULE
The garment shown in the PRIMARY IMAGE is the actual Ogle product being advertised and is the source of truth. Preserve its exact color, silhouette, construction, neckline, sleeves, cuffs, hemline, pattern, embroidery, embellishments, texture, transparency, layering, folds, drape and proportions wherever visible.
Do not redesign, restyle, simplify, embellish, recolor or reinterpret the garment. Do not invent garment details that are not visible in the source image.
Preserve visible footwear, jewelry and accessories unless specifically instructed otherwise.
This principle is also consistent with Astria's production guidance: the garment reference should be treated as the contract, with color, silhouette, print, trim, closure, sleeve, hem and construction explicitly protected. Astria

2. MODEL / IDENTITY LOCK — FIXED RULE + VARIABLE POSE
The PRIMARY IMAGE controls the person and pose.
Do not change the face of the subject. Keep the same person, same face and same identity.
Preserve facial structure, eyes, eyebrows, nose, lips, jawline, natural skin appearance, hairstyle, hair color and body proportions.
Preserve the exact pose shown in the PRIMARY IMAGE, including torso orientation, shoulder position, arm position, hands, fingers, legs, feet, gaze and expression.
Do not beautify, reshape, age, de-age, reposition or replace the model with a generic person.
Then we add a short Pose Description based on each particular photograph.
For example:
POSE DESCRIPTION:
Reclining diagonally across the staircase,
left palm supporting body weight,
right leg extended,
left knee slightly bent...
This is the only part of #2 that changes photograph to photograph.
If Astria provides a dedicated face/identity reference, use it. That gives us:
FACE REFERENCE = WHO

PRIMARY IMAGE = POSE + GARMENT

CAMPAIGN REFERENCE = VISUAL WORLD

3. BACKGROUND — SELECT FROM LIBRARY
Instead of rewriting a background every time, we create named modules:
Background ID
Ogle Background Family
BG-01
Luxury Indian Architecture
BG-02
Modern Delhi Luxury
BG-03
European Luxury
BG-04
Resort
BG-05
Minimal Studio
BG-06
Heritage
BG-07
Urban International
BG-08
Evening Luxury
BG-09
Corporate Luxury
BG-10
Festive
BG-11
Bridal
BG-12
Indo-Western Editorial
BG-13
Mediterranean Luxury Boutique Hotel
BG-14
1970s Italian Luxury Hotel

For the current campaign:
BG-14 — 1970s Italian Luxury Hotel
Sophisticated 1970s Italian luxury boutique hotel interior inspired by vintage Milan and Rome hospitality design. Premium cream travertine and warm stone, sculptural architectural forms, curved furniture, restrained brass details, luxurious upholstery and elegant arches.
Incorporate muted apricot #F49E4C, dusty blush #EFAAC4, deep terracotta #AB3428, and pale champagne #F5EE9E naturally through upholstery, walls, artwork, stone and decorative accents.
The environment should feel sophisticated, sensual, exclusive and editorial—not kitschy or retro-themed. Avoid excessive orange, busy patterns, crowds, hotel logos, signage and visual clutter. The outfit remains the visual hero.
We simply enter:
BACKGROUND = BG-14

4. LIGHTING — LINKED TO BACKGROUND
Lighting can have its own reusable module.
For BG-14:
Soft directional late-afternoon window light from front-left with subtle warm architectural lighting in the background. Maintain natural skin tones and the true color of the garment. Create dimensional highlights across fabric texture and folds, realistic contact shadows and controlled contrast.
Background lighting may complement the apricot, blush, cream, brass and terracotta palette but must not cast those colors onto the model or alter the garment color.
Subject remains brighter and visually dominant over the environment.
The important design principle we've discovered is:
BACKGROUND COLOR CAN CHANGE
        ↓
BACKGROUND LIGHT CAN CHANGE
        ↓
MODEL SKIN = PROTECTED
GARMENT COLOR = PROTECTED

5. CAMERA / COMPOSITION — MOSTLY PRESERVE
Preserve the original camera position, perspective, subject scale and pose composition from the PRIMARY IMAGE.
Do not arbitrarily change the camera angle or generate portions of the body that are outside the original photograph.
Professional luxury fashion editorial photography. Model and garment remain sharply rendered; background may have natural moderate depth of field.
Then add a small image-specific field:
SHOT TYPE:
Standing three-quarter
Seated full-body
Reclining full-body
Waist-up
etc.
We shouldn't need fake lens specifications unless there's a genuine reason.

6. OGLE MOOD / BRAND — FIXED
I would lock this now.
OGLE — ONE-OF-ONE LUXURY
High-end contemporary women's fashion characterized by confident, understated sensuality and exclusivity.
The woman should appear affluent, self-assured, sophisticated and effortlessly desirable rather than overtly provocative.
The image should create aspiration: the viewer should imagine herself wearing a unique Ogle creation and participating in the luxury lifestyle surrounding it.
Ogle garments are individually designed and no two outfits are the same. The visual treatment must communicate rarity, individuality and craftsmanship rather than mass-market fashion.
Sophisticated editorial realism, refined materials, controlled contrast and premium color grading.
Avoid mass-market catalog styling, artificial glamour effects, excessive retouching, cheap-looking luxury cues, obvious status symbols or visual clutter.
That should remain virtually identical across Ogle campaigns.

7. OUTPUT FORMAT — FIXED
Because Muse/Seedream/etc. don't always give us exact 4:5 output choices:
Compose for Instagram portrait 4:5 final delivery.
Keep all essential garment details, face, hands and other important fashion information inside the central 4:5-safe area.
Maintain sufficient safe space around the subject so the image can be cropped without cutting important elements.
Final delivery target: 1080 × 1350, 4:5.
Photorealistic, high-detail professional commercial fashion quality. No text, captions, logos or watermarks unless intentionally added later in the Ogle content-production process.

C. The Sunburst vs Seedream instruction
This becomes part of the SOP rather than the prompt itself.
Production stage
Astria model
Purpose
Hero / Pose 1
GPT Image 2.5 Sunburst
Establish the campaign environment and visual language
Human approval
—
Approve hotel/background, lighting, colors, luxury treatment
Pose 2 onward
Seedream 5 Pro
Apply that approved visual world to the other real poses
Final
—
QA + Instagram 4:5 crop

Astria itself recommends holding references, prompts and controls constant when comparing models; it also recommends turning the approved production decisions into templates only after the pilot passes review. Astria
For Seedream poses 2–5, add this header before #1:
REFERENCE IMAGE ROLES
Image 1 — PRIMARY IMAGE: Controls the model identity, garment, pose, body geometry, hands, legs, accessories and camera composition.
Image 2 — CAMPAIGN REFERENCE: Controls only the background design language, color palette, materials, lighting treatment and overall Ogle campaign aesthetic.
Do not copy the face, pose, body geometry or camera composition from Image 2. Adapt the environment to the pose shown in Image 1.
And based on the floating-model failure we discovered, add this whenever the pose interacts physically with the environment:
PHYSICAL CONTACT: Preserve all physical support implied by the original pose. Any hand, arm, hip, back, foot or body part resting against a wall, staircase, chair, sofa or other surface must have a believable corresponding architectural or furniture surface in the generated environment, with realistic gravity, pressure and contact shadows. Never leave the model floating or unsupported.

