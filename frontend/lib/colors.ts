export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type PaletteColor = {
  hex: string;
  locked: boolean;
};

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((value) =>
        Math.max(0, Math.min(255, Math.round(value)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

/**
 * Extract dominant colors from an image.
 *
 * We reduce the image to a small number of color buckets.
 * This makes the algorithm fast even for large images.
 */
export async function extractColors(
  file: File,
  colorCount = 5
): Promise<string[]> {
  const image = await loadImage(file);

  const canvas = document.createElement("canvas");

  // Small canvas = much faster processing.
  const MAX_SIZE = 150;

  const scale = Math.min(
    1,
    MAX_SIZE / Math.max(image.naturalWidth, image.naturalHeight)
  );

  canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale));

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context");
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const pixels = imageData.data;

  /**
   * Quantize colors.
   *
   * Instead of storing millions of possible RGB values,
   * we group nearby colors together.
   */
  const buckets = new Map<
    string,
    {
      r: number;
      g: number;
      b: number;
      count: number;
    }
  >();

  const STEP = 24;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const alpha = pixels[i + 3];

    // Ignore transparent pixels.
    if (alpha < 128) continue;

    const qr = Math.floor(r / STEP);
    const qg = Math.floor(g / STEP);
    const qb = Math.floor(b / STEP);

    const key = `${qr}-${qg}-${qb}`;

    const bucket = buckets.get(key);

    if (bucket) {
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.count++;
    } else {
      buckets.set(key, {
        r,
        g,
        b,
        count: 1,
      });
    }
  }

  const sortedBuckets = [...buckets.values()].sort(
    (a, b) => b.count - a.count
  );

  const selected: RGB[] = [];

  /**
   * Don't just take the five biggest buckets.
   *
   * If an image contains 5 slightly different shades of blue,
   * we want visually different colors instead.
   */
  for (const bucket of sortedBuckets) {
    const color = {
      r: bucket.r / bucket.count,
      g: bucket.g / bucket.count,
      b: bucket.b / bucket.count,
    };

    const tooSimilar = selected.some(
      (existing) => colorDistance(existing, color) < 55
    );

    if (!tooSimilar) {
      selected.push(color);
    }

    if (selected.length === colorCount) {
      break;
    }
  }

  /**
   * If there weren't enough sufficiently different colors,
   * fill the remaining slots with the next dominant colors.
   */
  if (selected.length < colorCount) {
    for (const bucket of sortedBuckets) {
      if (selected.length >= colorCount) break;

      const color = {
        r: bucket.r / bucket.count,
        g: bucket.g / bucket.count,
        b: bucket.b / bucket.count,
      };

      const alreadyIncluded = selected.some(
        (existing) => colorDistance(existing, color) < 10
      );

      if (!alreadyIncluded) {
        selected.push(color);
      }
    }
  }

  return selected
    .slice(0, colorCount)
    .map((color) => rgbToHex(color.r, color.g, color.b));
}

function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
      Math.pow(a.g - b.g, 2) +
      Math.pow(a.b - b.b, 2)
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);

    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    image.src = url;
  });
}

/**
 * Generate a visually pleasing random color.
 */
export function generateRandomColor(
  existingColors: string[] = []
): string {
  const curatedColors = [
    // Blues
    "#264653",
    "#2A4961",
    "#315A72",
    "#3D5A80",
    "#456882",
    "#52758A",
    "#5C7C89",
    "#6B8E9B",

    // Greens
    "#31594F",
    "#3F6657",
    "#4F705F",
    "#587C68",
    "#668F80",
    "#78988B",
    "#819C8B",

    // Teals
    "#285C5B",
    "#356F6D",
    "#467C78",
    "#568F87",
    "#669B91",

    // Purples
    "#4B425C",
    "#594B68",
    "#665675",
    "#756582",
    "#806F8F",
    "#927E9B",

    // Mauves / Rose
    "#754F5B",
    "#805866",
    "#916475",
    "#A27684",
    "#AD8190",
    "#B78A96",

    // Terracotta / Earth
    "#774936",
    "#895746",
    "#9A6652",
    "#A9745D",
    "#B98268",
    "#C18C70",

    // Mustard / Gold
    "#806B3F",
    "#927A45",
    "#A4864D",
    "#B29458",
    "#C09E61",

    // Neutral / Slate
    "#39434A",
    "#465159",
    "#536068",
    "#626E74",
    "#707B80",
    "#7E888B",

    // Dark sophisticated colors
    "#1F2933",
    "#263238",
    "#303B44",
    "#343A40",
    "#3A4147",
    "#424A50",
  ];

  // Remove colors that are already being used.
  const availableColors = curatedColors.filter(
    (color) =>
      !existingColors.some(
        (existing) =>
          colorDistance(
            hexToRgb(existing),
            hexToRgb(color)
          ) < 45
      )
  );

  // If we've exhausted the curated palette,
  // fall back to a controlled HSL color.
  if (availableColors.length === 0) {
    return hslToHex(
      Math.floor(Math.random() * 360),
      35 + Math.random() * 25,
      35 + Math.random() * 25
    );
  }

  const randomIndex = Math.floor(
    Math.random() * availableColors.length
  );

  return availableColors[randomIndex];
}

function hslToHex(
  h: number,
  s: number,
  l: number
): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return rgbToHex(
    (r + m) * 255,
    (g + m) * 255,
    (b + m) * 255
  );
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}