import { NextRequest, NextResponse } from "next/server";
import { getPortfolioContent, normalizePortfolioContent, requireAdminUser, savePortfolioContent } from "@/lib/cms";

export async function GET() {
  const content = await getPortfolioContent();
  return NextResponse.json({ content });
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

  try {
    await requireAdminUser(token);
    const body = await request.json();
    const content = normalizePortfolioContent(body);
    await savePortfolioContent(content);

    return NextResponse.json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content.";
    const status = message.includes("not allowed") ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
