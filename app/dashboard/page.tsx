"use client";

import { useState } from "react";

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([
        {
            id: 1,
            name: "Employment Contract.pdf",
            size: "2.4 MB",
            type: "PDF",
            uploadDate: "Aug 26, 2025",
            status: "Analyzed",
        },
        {
            id: 2,
            name: "Service Agreement.docx",
            size: "1.8 MB",
            type: "DOCX",
            uploadDate: "Aug 25, 2025",
            status: "Processing",
        },
    ]);

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
        // Handle file drop logic here
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file selection logic here
    };

    return (
        <div className="bg-background min-h-screen">
            <main>
                <div className="relative isolate">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-border [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] blur-[4px]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="upload-pattern"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg
                            x="50%"
                            y={-1}
                            className="overflow-visible fill-muted/60"
                        >
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            fill="url(#upload-pattern)"
                            width="100%"
                            height="100%"
                            strokeWidth={0}
                        />
                    </svg>

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
                                            <svg
                                                className="w-8 h-8 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        </div>

                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {dragActive
                                                ? "Drop files here"
                                                : "Choose files or drag here"}
                                        </h3>
                                        <p className="text-muted-foreground mb-6">
                                            Supports PDF, DOC, DOCX files up to
                                            10MB
                                        </p>

                                        {/* File Input */}
                                        <label className="inline-block">
                                            <input
                                                type="file"
                                                multiple
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            <span className="cursor-pointer inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-sm transition-colors duration-200">
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
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
                                                                <svg
                                                                    className="w-6 h-6 text-red-500"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
                                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z" />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    className="w-6 h-6 text-blue-500"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                                                </svg>
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
                                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                            }`}
                                                        >
                                                            {file.status}
                                                        </span>

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                                                <svg
                                                                    className="w-4 h-4 text-muted-foreground hover:text-foreground"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                                                <svg
                                                                    className="w-4 h-4 text-muted-foreground hover:text-red-500"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
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
                                        <svg
                                            className="w-12 h-12 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
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
