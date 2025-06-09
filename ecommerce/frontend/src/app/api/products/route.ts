import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

function filterHeaders(headers: Headers) {
  const filtered: Record<string, string> = {};
  headers.forEach((value, key) => {
    if (typeof key === "string" && typeof value === "string") {
      filtered[key] = value;
    }
  });
  // Remova o host para evitar conflitos
  delete filtered["host"];
  return filtered;
}

export async function POST(req: NextRequest) {
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
  const url = `${BACKEND_URL}/api/products`;

  const response = await fetch(url, {
    method: "POST",
    headers: filterHeaders(req.headers),
    body: req.body,
    // @ts-expect-error duplex is Node.js only
    duplex: "half", 
  });

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (contentType.includes("application/json") && text) {
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      return new NextResponse(text, { status: response.status });
    }
  } else {
    return new NextResponse(text, { status: response.status });
  }
}