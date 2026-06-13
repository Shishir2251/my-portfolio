import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminStorage } from "@/lib/firebase/admin";
import { requireAdminUser } from "@/lib/cms";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
    await requireAdminUser(token);

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "resumes");
    const filename = String(formData.get("filename") ?? "resume.pdf");

    const isUploadFile =
      typeof file === "object" &&
      file !== null &&
      "arrayBuffer" in file &&
      "name" in file &&
      "type" in file;

    if (!isUploadFile) {
      return NextResponse.json({ error: "Missing PDF file." }, { status: 400 });
    }

    if (String((file as File).type) !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed." }, { status: 400 });
    }

    const storage = getAdminStorage();
    if (!storage) {
      return NextResponse.json({ error: "Firebase Storage is not configured." }, { status: 500 });
    }

    const bucketName = process.env.FIREBASE_STORAGE_BUCKET ?? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
      return NextResponse.json({ error: "Missing storage bucket name.", stage: "bucket-name" }, { status: 500 });
    }

    const bucket = storage.bucket(bucketName);

    const uploadFile = file as { arrayBuffer: () => Promise<ArrayBuffer>; name: string };
    const buffer = Buffer.from(await uploadFile.arrayBuffer());
    const safeName = filename.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${folder}/${safeName}`;
    const bucketFile = bucket.file(path);
    const downloadToken = randomUUID();

    try {
      await bucketFile.save(buffer, {
        metadata: {
          contentType: "application/pdf",
          metadata: {
            firebaseStorageDownloadTokens: downloadToken,
            originalName: uploadFile.name,
            uploadedAt: new Date().toISOString(),
          },
        },
        resumable: false,
      });
    } catch (error) {
      console.error("Resume upload save failed", error);
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Failed to save file to Storage.",
          stage: "save",
        },
        { status: 500 }
      );
    }

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${downloadToken}`;

    return NextResponse.json({ url: publicUrl, path, stage: "ok" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message, stage: "request" }, { status: 400 });
  }
}
