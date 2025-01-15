import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = "bhtMv--eHOm1TM-b5oDIPaoavYEoFOql5BwKmdC2_9s"; // Replace with your Unsplash Access Key

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json(); // Extract query from the request body

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Fetch random image from Unsplash based on the query
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        `teaching about ${query}`
      )}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!unsplashResponse.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const images = await unsplashResponse.json();

    if (images.length === 0) {
      return NextResponse.json(
        { error: "No images found for the query" },
        { status: 404 }
      );
    }

    // Extract the URL of the image
    const imageUrl = images.urls.raw;

    // Return the image URL
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return NextResponse.json(
      { error: "Failed to fetch image from Unsplash" },
      { status: 500 }
    );
  }
}
