"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { analyzeImage } from "@/lib/api";

import {
  extractColors,
  generateRandomColor,
  PaletteColor,
} from "@/lib/colors";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [palette, setPalette] = useState<PaletteColor[]>([]);

  const [isExtracting, setIsExtracting] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const [hasUploadedImage, setHasUploadedImage] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

const [ isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setIsExtracting(true);
    setImageFile(file)

    try {
      const url = URL.createObjectURL(file);

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      setImageUrl(url);

      const colors = await extractColors(file, 5);

      setPalette(
        colors.map((hex) => ({
          hex,
          locked: false,
        }))
      );

      setHasUploadedImage(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while processing the image.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

      const handleContinue = async () => {

        if (!imageFile) {
          alert("Image is missing.");
          return;
        }


        const lockedColors =
          palette
            .filter((color) => color.locked)
            .map((color) => color.hex);


        if (lockedColors.length === 0) {
          alert(
            "Lock at least one color before continuing."
          );

          return;
        }


        setIsAnalyzing(true);


        try {

          const result =
            await analyzeImage(
              imageFile,
              lockedColors
            );


          sessionStorage.setItem(
            "imageId",
            result.image_id
          );


          sessionStorage.setItem(
            "prompt",
            result.prompt
          );

          sessionStorage.setItem(
            "imageUrl",
            result.image_url
          );


          sessionStorage.setItem(
            "lockedColors",
            JSON.stringify(
              result.locked_colors
            )
          );


          window.location.href =
            "/prompt";

        } catch (error) {

          console.error(error);

          alert(
            "Failed to analyze the image."
          );

        } finally {

          setIsAnalyzing(false);

        }
      };

  const toggleLock = (index: number) => {
    setPalette((current) =>
      current.map((color, i) =>
        i === index
          ? {
              ...color,
              locked: !color.locked,
            }
          : color
      )
    );
  };

  const generateNewPalette = () => {
    setPalette((current) => {
      const currentColors = current.map((color) => color.hex);

      return current.map((color) => {
        if (color.locked) {
          return color;
        }

        const newColor = generateRandomColor(currentColors);

        return {
          ...color,
          hex: newColor,
        };
      });
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      /**
       * Don't generate colors if the user is typing somewhere.
       */
      const target = event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.code === "Space") {
        event.preventDefault();

        if (palette.length > 0) {
          generateNewPalette();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [palette]);

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">C</div>

          <div>
            <div className="brand-name">
              ColorForge
            </div>

            <div className="brand-subtitle">
              Image → Palette
            </div>
          </div>
        </div>

        <div className="topbar-hint">
          {hasUploadedImage
            ? "Press SPACE to generate"
            : "Upload an image to begin"}
        </div>
      </header>

      {!hasUploadedImage ? (
        <section className="picker-page">
          <div className="picker-heading">
            <h1>Image picker</h1>

            <p>
              Extract beautiful color palettes from
              your photos.
            </p>
          </div>

          <div className="picker-card">
            <div className="picker-controls">
              <div className="control-title">
                Picked palette
              </div>

              <div className="empty-palette">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <button
                className="browse-button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <span>Browse image</span>
                <span>⌁</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />

              <p className="privacy-text">
                Your image is processed locally in
                your browser.
              </p>
            </div>

            <div
              className={`drop-zone ${
                isDragging ? "dragging" : ""
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => {
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <div className="upload-icon">
                ↑
              </div>

              <h2>
                {isDragging
                  ? "Drop your image here"
                  : "Drop an image here"}
              </h2>

              <p>
                or click to browse from your computer
              </p>

              {isExtracting && (
                <div className="loading">
                  Extracting colors...
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="workspace">
          <div className="workspace-header">
            <div>
              <h1>Your palette</h1>

              <p>
                Press <kbd>SPACE</kbd> to generate a
                new palette.
              </p>
            </div>

            <button
              className="new-image-button"
              onClick={() => {
                setHasUploadedImage(false);
                setPalette([]);
                setImageUrl(null);
              }}
            >
              Choose another image
            </button>
          </div>

          <div className="workspace-grid">
            <div className="image-panel">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              )}
            </div>

            <div className="palette-panel">
              <div className="palette-bar">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="color-column"
                    style={{
                      backgroundColor: color.hex,
                    }}
                  >
                    <div className="color-content">
                      <div className="color-index">
                        0{index + 1}
                      </div>

                      <div className="hex">
                        {color.hex}
                      </div>

                      <button
                        className={`lock-button ${
                          color.locked
                            ? "locked"
                            : ""
                        }`}
                        onClick={() =>
                          toggleLock(index)
                        }
                        title={
                          color.locked
                            ? "Unlock color"
                            : "Lock color"
                        }
                      >
                        {color.locked ? "🔒" : "🔓"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="palette-footer">
            <div className="footer-info">
              <span>
                {palette.filter(
                  (color) => color.locked
                ).length}{" "}
                locked
              </span>

              <span>•</span>

              <span>
                {palette.length} colors
              </span>
            </div>

            <button
            className="generate-button"
            onClick={handleContinue}
            disabled={isAnalyzing}
          >
            {isAnalyzing
              ? "Analyzing image..."
              : "Continue"}
          </button>
          </div>
        </section>
      )}
    </main>
  );
}