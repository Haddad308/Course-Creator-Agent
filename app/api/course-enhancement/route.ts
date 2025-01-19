import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("file");

  console.log("file", file);

  const allowedExtensions = [".pdf", ".doc", ".docx", ".txt"];
  const fileExtension = path.extname((file as File).name).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return NextResponse.json(
      { error: "Invalid file type. Only documents are allowed." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const fileContent = await (file as File).text();
  console.log("Document content:", fileContent);

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  const filename = (file as File).name.replaceAll(" ", "_");

  try {
    const dir = path.join(process.cwd(), "public/assets");
    await fs.promises.mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
