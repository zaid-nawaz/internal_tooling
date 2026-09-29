"use client";
import "./prompt.css";

import { useEffect, useState } from "react";
import { generateImage } from "@/lib/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const MODELS = [
//   {
//     id: "3159068",
//     name: "Nano Banana",
//     description: "Gemini 2.5 Flash",
//   },
  {
    id: "1504944",
    name: "FLUX.1 Dev",
    description: "Strong image generation",
  },
  {
    id: "4180298",
    name: "Nano Banana 2",
    description: "Next-generation image generation",
  },
  {
    id: "5236038",
    name: "Seedream 5.0 Pro",
    description: "High-quality fashion generation",
  },
  {
    id: "5605622",
    name: "Muse Image",
    description: "Creative image generation",
  },
  {
    id: "5634510",
    name: "GPT Image 2.5 Sunburst",
    description: "Hero image generation",
  },
  {
    id: "5634511",
    name: "GPT Image 2.5 Flare",
    description: "High-quality image generation",
  },
];

export default function PromptPage() {
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [lockedColors, setLockedColors] = useState<string[]>([]);
  const [model, setModel] = useState("seedream");
  const [numImages, setNumImages] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const storedImageId = sessionStorage.getItem("imageId");
    const storedPrompt = sessionStorage.getItem("prompt");
    const storedColors = sessionStorage.getItem("lockedColors");
    const storedImageUrl = sessionStorage.getItem("imageUrl");

    if (storedImageId) {
      setImageId(storedImageId);
    }

    if (storedPrompt) {
      setPrompt(storedPrompt);
    }

    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }

    if (storedColors) {
      setLockedColors(JSON.parse(storedColors));
    }
  }, []);

  const handleGenerate = async () => {
    if (!imageId) {
      alert("Image not found.");
      return;
    }

    if (!prompt.trim()) {
      alert("Prompt cannot be empty.");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateImage(
        imageId,
        prompt,
        model,
        numImages
      );

      sessionStorage.setItem(
        "generation",
        JSON.stringify(result)
      );

      window.location.href = "/results";
    } catch (error) {
      console.error(error);
      alert("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!imageId) {
    return (
      <main className="prompt-page">
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h1>No image selected</h1>
          <p>Go back and select an image to continue.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="prompt-page">

      {/* ───────────────── HEADER ───────────────── */}

      <header className="editor-header">

        <div className="brand">
          <div className="brand-mark">C</div>

          <div className="brand-copy">
            <div className="brand-name">
              ColorForge
            </div>

            <div className="brand-subtitle">
              AI Fashion Studio
            </div>
          </div>
        </div>

        <div className="editor-step">
          <span className="step-active">02</span>
          <span className="step-divider" />
          <span>03</span>
        </div>

      </header>


      {/* ───────────────── MAIN ───────────────── */}

      <section className="editor-layout">

        {/* LEFT — IMAGE */}

        <div className="image-section">

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                SOURCE IMAGE
              </span>

              <h1>
                Review your image
              </h1>
            </div>
          </div>


          <div className="image-frame">

            {imageUrl && (
              <img
                src={`${API_URL}${imageUrl}`}
                alt="Uploaded fashion image"
              />
            )}

            <div className="image-badge">
              ORIGINAL
            </div>

          </div>


          {/* COLORS */}

          <div className="palette-section">

            <div className="palette-heading">
              <div>
                <span className="eyebrow">
                  COLOR PALETTE
                </span>

                <p>
                  Locked colors will guide the
                  campaign environment.
                </p>
              </div>

              <span className="color-count">
                {lockedColors.length} locked
              </span>
            </div>


            <div className="palette">

              {lockedColors.map((color) => (
                <div
                  className="palette-color"
                  key={color}
                >
                  <div
                    className="color-swatch"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span>
                    {color}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>


        {/* RIGHT — PROMPT */}

        <div className="control-section">

          <div className="prompt-header">

            <div>
              <span className="eyebrow">
                AI ANALYSIS
              </span>

              <h1>
                Build your look
              </h1>

              <p>
                Your image has been analyzed.
                Review and refine the production
                prompt before generating.
              </p>
            </div>

            <div className="ai-status">
              <span className="status-dot" />
              AI READY
            </div>

          </div>


          {/* PROMPT EDITOR */}

          <div className="prompt-editor">

            <div className="prompt-editor-header">

              <span>
                PRODUCTION PROMPT
              </span>

              <span className="editable-label">
                EDITABLE
              </span>

            </div>


            <textarea
              value={prompt}
              onChange={(event) =>
                setPrompt(event.target.value)
              }
              spellCheck={false}
            />

            <div className="prompt-editor-footer">

              <span>
                {prompt.length.toLocaleString()} characters
              </span>

              <span>
                7-part fashion specification
              </span>

            </div>

          </div>


          {/* GENERATION SETTINGS */}

          <div className="settings-section">

            <div className="settings-heading">
              <span className="eyebrow">
                GENERATION
              </span>

              <p>
                Choose how you want to generate
                your campaign imagery.
              </p>
            </div>


            <div className="settings-grid">

              {/* MODEL */}

              <div className="setting-card">

                <div className="setting-label">
                  <span>MODEL</span>
                </div>

                <select
                  value={model}
                  onChange={(event) =>
                    setModel(event.target.value)
                  }
                >

                  {MODELS.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}

                </select>

                <p>
                  {
                    MODELS.find(
                      (item) => item.id === model
                    )?.description
                  }
                </p>

              </div>


              {/* IMAGE COUNT */}

              <div className="setting-card">

                <div className="setting-label">
                  <span>OUTPUTS</span>
                </div>

                <div className="number-selector">

                  {[1, 2, 3, 4].map((number) => (
                    <button
                      key={number}
                      className={
                        numImages === number
                          ? "number-option active"
                          : "number-option"
                      }
                      onClick={() =>
                        setNumImages(number)
                      }
                    >
                      {number}
                    </button>
                  ))}

                </div>

                <p>
                  Generate up to 4 variations
                </p>

              </div>

            </div>

          </div>


          {/* GENERATE */}

          <div className="generate-section">

            <button
              className="generate-button"
              onClick={handleGenerate}
              disabled={isGenerating}
            >

              <span>
                {isGenerating
                  ? "Generating..."
                  : "Generate images"}
              </span>

              {!isGenerating && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>

            <p className="generate-note">
              Generation uses your selected model
              and locked campaign palette.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}