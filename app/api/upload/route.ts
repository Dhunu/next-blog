import { mkdir, unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
    // Parse the incoming form data
    const data = await req.formData();
    const file: File | null = data.get("file") as File;

    console.log({ file });

    if (!file) {
        return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log({ buffer });

    // Save the file to the file system
    const path = join("public", "/uploads", file.name);

    console.log({ path });

    await writeFile(path, buffer);

    return NextResponse.json({ path }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const { path } = await req.json();
    const filePath = join("public", path);

    try {
        await unlink(filePath);

        return NextResponse.json({ message: "File deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "File not found" },
            { status: 404 }
        );
    }
}
