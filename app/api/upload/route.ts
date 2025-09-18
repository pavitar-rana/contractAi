import { NextRequest, NextResponse } from "next/server";
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEmbedding } from "@/lib/embed";
import { Pool } from "pg";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const accountName = process.env.AZURE_STORAGE_ACCOUNT!;
const accountKey = process.env.AZURE_STORAGE_KEY!;
const containerName = "contracts";

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email || "" },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Only PDF and DOCX files are allowed" },
                { status: 400 }
            );
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File size must be less than 10MB" },
                { status: 400 }
            );
        }

        const loader = new WebPDFLoader(file, { splitPages: false });
        const docs = await loader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 60,
        });

        const sdocs = await splitter.createDocuments([docs[0].pageContent]);

        const embeddings = await Promise.all(
            sdocs.map(async (doc) => await getEmbedding(doc.pageContent))
        );

        const buffer = Buffer.from(await file.arrayBuffer());

        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists();

        const blobName = `${uuidv4()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: { blobContentType: file.type },
        });

        const contract = await prisma.contract.create({
            data: {
                userId: user.id,
                blobName,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
            },
        });

        // await Promise.all(
        //     sdocs.map(async (doc, i) => {
        //         const embedding = embeddings[i];

        //         const query = `
        //         INSERT INTO "Embedding" ("text", "embedding", "metadata", "createdAt")
        //         VALUES ($1, $2::vector, $3::jsonb, now())
        //     `;
        //         await pool.query(query, [
        //             doc.pageContent,
        //             JSON.stringify(embedding),
        //             JSON.stringify(doc.metadata || {}),
        //         ]);
        //     })
        // );

        console.log("got here 3");

        // Return blob name for future retrieval
        return NextResponse.json({
            blobName,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            message: "File uploaded successfully",
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
