"use client";

import { DocIcon, HeroBgPattern, PdfIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import {
    LucideFileDown,
    LucideFileText,
    LucideLoaderCircle,
    LucidePlus,
    LucideTrash2,
    LucideUpload,
} from "lucide-react";
import { useState } from "react";

interface UploadedFile {
    id: number;
    name: string;
    size: string;
    type: string;
    uploadDate: string;
    status: "Uploading" | "Processing" | "Analyzed" | "Error";
    blobName?: string;
}

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        // {
        //     id: 1,
        //     name: "Employment Contract.pdf",
        //     size: "2.4 MB",
        //     type: "PDF",
        //     uploadDate: "Aug 26, 2025",
        //     status: "Analyzed",
        // },
        // {
        //     id: 2,
        //     name: "Service Agreement.docx",
        //     size: "1.8 MB",
        //     type: "DOCX",
        //     uploadDate: "Aug 25, 2025",
        //     status: "Processing",
        // },
    ]);

    // File validation function
    const validateFile = (file: File): string | null => {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
        ];

        const maxSize = 10 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            return "Only PDF and DOCX files are allowed";
        }

        if (file.size > maxSize) {
            return "File size must be less than 10MB";
        }

        return null;
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Upload file function
    const uploadFile = async (file: File): Promise<void> => {
        const validationError = validateFile(file);
        if (validationError) {
            alert(validationError);
            return;
        }

        const fileId = Date.now() + Math.random();
        const newFile: UploadedFile = {
            id: fileId,
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type.includes("pdf") ? "PDF" : "DOCX",
            uploadDate: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
            status: "Uploading",
        };

        // Add file to list immediately
        setUploadedFiles((prev) => [newFile, ...prev]);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Upload failed");
            }

            // Update file status to processing
            setUploadedFiles((prev) =>
                prev.map((f) =>
                    f.id === fileId
                        ? {
                              ...f,
                              status: "Processing" as const,
                              blobName: result.blobName,
                          }
                        : f
                )
            );

            // Simulate processing completion after 2 seconds
            setTimeout(() => {
                setUploadedFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId
                            ? { ...f, status: "Analyzed" as const }
                            : f
                    )
                );
            }, 2000);
        } catch (error) {
            console.error("Upload error:", error);
            // Update file status to error
            setUploadedFiles((prev) =>
                prev.map((f) =>
                    f.id === fileId ? { ...f, status: "Error" as const } : f
                )
            );
        }
    };

    // Delete file function
    const deleteFile = (fileId: number) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        files.forEach((file) => uploadFile(file));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach((file) => uploadFile(file));

        // Reset input value so same file can be uploaded again
        e.target.value = "";
    };

    return (
        <div className="bg-background min-h-screen">
            <main>
                <div className="relative isolate">
                    <div className=" blur-[3px]">
                        <HeroBgPattern />
                    </div>

                    {/* Gradient blur effect */}
                    <div
                        aria-hidden="true"
                        className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                            }}
                            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30"
                        />
                    </div>

                    {/* Main content */}
                    <div className="relative px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                    Upload Your Contracts
                                </h1>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    Upload PDF or Word documents to analyze with
                                    AI. Drag and drop files or click to browse.
                                </p>
                            </div>

                            {/* Upload Area */}
                            <div className="mb-12">
                                <div
                                    className={`relative bg-background/90 backdrop-blur-md border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 shadow-xl ${
                                        dragActive
                                            ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10"
                                            : "border-border/50 hover:border-border shadow-lg hover:shadow-xl"
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="mx-auto max-w-md">
                                        {/* Upload Icon */}
                                        <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-primary/10">
                                            <LucideUpload
                                                className="text-primary"
                                                size={26}
                                            />
                                        </div>

                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {dragActive
                                                ? "Drop files here"
                                                : "Choose files or drag here"}
                                        </h3>
                                        <p className="text-muted-foreground mb-6">
                                            Supports PDF and DOCX files up to
                                            10MB
                                        </p>

                                        <label className="inline-block">
                                            <input
                                                type="file"
                                                multiple
                                                accept=".pdf,.docx"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            <span className="cursor-pointer inline-flex items-center px-6 py-3  hover:bg-muted/20 hover:text-primary text-muted-foreground font-medium rounded-lg shadow-sm transition-colors duration-200 gap-1">
                                                <LucidePlus size={18} />
                                                Browse Files
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Uploaded Files Section */}
                            {uploadedFiles.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold text-foreground">
                                            Uploaded Documents
                                        </h2>
                                        <span className="text-sm text-muted-foreground">
                                            {uploadedFiles.length} file
                                            {uploadedFiles.length !== 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {uploadedFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="bg-background/90 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:border-border transition-all duration-200 group shadow-lg hover:shadow-xl"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        {/* File Icon */}
                                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                            {file.type ===
                                                            "PDF" ? (
                                                                <PdfIcon />
                                                            ) : (
                                                                <DocIcon />
                                                            )}
                                                        </div>

                                                        {/* File Info */}
                                                        <div>
                                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                                {file.name}
                                                            </h3>
                                                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                                                <span>
                                                                    {file.size}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {file.type}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {
                                                                        file.uploadDate
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Status and Actions */}
                                                    <div className="flex items-center space-x-3">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                file.status ===
                                                                "Analyzed"
                                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                                    : file.status ===
                                                                      "Processing"
                                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                                    : file.status ===
                                                                      "Uploading"
                                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                            }`}
                                                        >
                                                            {file.status ===
                                                                "Uploading" && (
                                                                <div className="flex items-center space-x-1">
                                                                    <LucideLoaderCircle className="animate-spin h-3 w-3" />
                                                                    <span>
                                                                        Uploading
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {file.status !==
                                                                "Uploading" &&
                                                                file.status}
                                                        </span>

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                                                <LucideFileDown className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                                            </button>
                                                            <button
                                                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                                                onClick={() =>
                                                                    deleteFile(
                                                                        file.id
                                                                    )
                                                                }
                                                                title="Delete file"
                                                            >
                                                                <LucideTrash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State */}
                            {uploadedFiles.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-muted/50">
                                        <LucideFileText className="w-11 h-11 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                                        No documents uploaded yet
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Upload your first contract to get
                                        started with AI analysis
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
