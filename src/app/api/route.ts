import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  const theFile: File | null = data.get("file") as unknown as File;

  const formData = new FormData();
  formData.append("file", theFile);
  formData.append("model", "whisper-1");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OpenAI API key in environment variables");
  }

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  const body = await response.json();

  return NextResponse.json({ output: body });
}