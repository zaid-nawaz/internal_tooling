"use client";

import { useEffect, useState } from "react";
import "./results.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Generation = {
  status: string;
  generation_id?: string;
  data?: {
    prompt?: {
      id?: number;
      images?: string[];
      num_images?: number;
      aspect_ratio?: string;
      tune_id?: number;
    };
  };
};

export default function ResultsPage() {
  const [generation, setGeneration] =
    useState<Generation | null>(null);

  const [status, setStatus] =
    useState("processing");

  useEffect(() => {
    const stored =
      sessionStorage.getItem("generation");

    if (!stored) {
      setStatus("error");
      return;
    }

    try {
      const initialGeneration =
        JSON.parse(stored);

      setGeneration(initialGeneration);

      const generationId =
        initialGeneration.generation_id;

      if (!generationId) {
        setStatus("error");
        return;
      }

        let interval: NodeJS.Timeout;

        const poll = async () => {
        try {
            const response = await fetch(
            `${API_URL}/api/callbacks/astria/${generationId}`
            );

            if (!response.ok) {
            return;
            }

            const data = await response.json();

            if (data.status === "completed") {
            setGeneration(data);
            setStatus("completed");

            clearInterval(interval);
            }
        } catch (error) {
            console.error(
            "Polling error:",
            error
            );
            clearInterval(interval);
            setStatus("error");
        }
        };

        interval = setInterval(
        poll,
        3000
        );

        poll();

        return () => {
        clearInterval(interval);
        };
    } catch (error) {
      console.error(
        "Failed to parse generation:",
        error
      );

      setStatus("error");
    }
  }, []);

  const images =
    generation?.data?.prompt?.images || [];

  return (
    <main className="results-page">

      {/* HEADER */}

      <header className="results-header">
        <div className="results-header-inner">

          <div>
            <div className="brand-name">
              ColorForge
            </div>

            <div className="brand-subtitle">
              Generated Results
            </div>
          </div>

          {status === "completed" && (
            <div className="completion-status">
              <span className="completion-dot" />
              Generation completed
            </div>
          )}

        </div>
      </header>


      {/* CONTENT */}

      <section className="results-content">

        <div className="page-heading">

          <p className="page-eyebrow">
            AI Fashion Studio
          </p>

          <h1 className="page-title">
            Your generations
          </h1>

          <p className="page-description">
            Your generated fashion imagery
            is ready.
          </p>

        </div>


        {/* PROCESSING */}

        {status === "processing" && (
          <div className="processing-container">

            <div className="processing-content">

              <div className="loading-spinner" />

              <p className="processing-text">
                Astria is processing
                your images...
              </p>

              <p className="processing-subtext">
                This usually takes a
                little while.
              </p>

            </div>

          </div>
        )}


        {/* RESULTS */}

        {status === "completed" &&
          images.length > 0 && (
            <div className="results-grid">

              {images.map(
                (image, index) => (
                  <div
                    key={image}
                    className="image-card"
                  >

                    <div className="image-wrapper">

                      <img
                        src={image}
                        alt={`Generated fashion image ${
                          index + 1
                        }`}
                        className="generated-image"
                      />

                      <div className="image-label">
                        Generated {index + 1}
                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}


        {/* NO IMAGES */}

        {status === "completed" &&
          images.length === 0 && (
            <div className="empty-state">

              <p className="empty-state-text">
                Generation completed,
                but no image URLs were
                returned.
              </p>

            </div>
          )}


        {/* ERROR */}

        {status === "error" && (
          <div className="error-state">

            <p className="error-text">
              Unable to retrieve
              your generation.
            </p>

          </div>
        )}

      </section>

    </main>
  );
}