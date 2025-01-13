import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";
import cloudinary from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "dly3vjbnu",
  api_key: "949721627781981",
  api_secret: "XaylN5m8kul0hqpnLuFpjIOK7Jc",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const { image } = await generateImage({
      model: openai.image("dall"),
      prompt: description,
    });

    // Convert image to base64 URL
    const base64Image = image.toString("base64");

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      { folder: "generated_images" }
    );

    // Return Cloudinary image URL
    res.status(200).json({ imageUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
