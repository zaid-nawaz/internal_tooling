const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";


export async function analyzeImage(
  file: File,
  lockedColors: string[]
) {

  const formData = new FormData();

  formData.append(
    "image",
    file
  );

  formData.append(
    "locked_colors",
    JSON.stringify(lockedColors)
  );


  const response = await fetch(
    `${API_URL}/api/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );


  if (!response.ok) {

    const error =
      await response.text();

    throw new Error(error);
  }


  return response.json();
}


export async function generateImage(
  imageId: string,
  prompt: string,
  model: string,
  numImages: number
) {

  const formData = new FormData();

  formData.append(
    "image_id",
    imageId
  );

  formData.append(
    "prompt",
    prompt
  );

  formData.append(
    "model",
    model
  );

  formData.append(
    "num_images",
    String(numImages)
  );


  const response = await fetch(
    `${API_URL}/api/generate`,
    {
      method: "POST",
      body: formData,
    }
  );


  if (!response.ok) {

    const error =
      await response.text();

    throw new Error(error);
  }


  return response.json();
}