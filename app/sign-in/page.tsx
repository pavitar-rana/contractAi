"use client";

import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

    if (status === "loading") {
        return <div />;
    }

    if (session) {
        return (
            <div className="flex-1 h-[100vh] flex items-center justify-center">
                <Spinner className="text-primary" variant="ring" size={64} />
            </div>
        );
    }

    return (
        <div className="bg-background">
            <main>
                <div className="relative isolate">
                    {/* Background pattern from hero section */}
                    <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-border [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="auth-pattern"
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
                            className="overflow-visible fill-muted"
                        >
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            fill="url(#auth-pattern)"
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

                    {/* Auth content */}
                    <div className="overflow-hidden flex justify-center items-center min-h-[100vh] w-[100vw] px-6">
                        <div className="mx-auto max-w-md w-full">
                            {/* Auth card */}
                            <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                                        Welcome to Contract AI
                                    </h1>
                                    <p className="mt-3 text-muted-foreground">
                                        Sign in to start analyzing your
                                        contracts with AI
                                    </p>
                                </div>

                                {/* Google Sign In Button */}
                                <button
                                    onClick={() =>
                                        signIn("google", {
                                            callbackUrl: "/dashboard",
                                        })
                                    }
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g>
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="12"
                                                fill="#fff"
                                            />
                                            <path
                                                d="M21.805 12.227c0-.638-.057-1.252-.163-1.818H12v3.44h5.522a4.726 4.726 0 0 1-2.05 3.104v2.58h3.31c1.936-1.784 3.023-4.414 3.023-7.306z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 22c2.7 0 4.97-.89 6.627-2.41l-3.31-2.58c-.91.61-2.07.97-3.317.97-2.553 0-4.72-1.726-5.492-4.045H2.39v2.64A9.997 9.997 0 0 0 12 22z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M6.508 13.935A5.997 5.997 0 0 1 6.13 12c0-.673.12-1.326.335-1.935V7.425H2.39A9.997 9.997 0 0 0 2 12c0 1.64.393 3.19 1.09 4.575l3.418-2.64z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 6.58c1.47 0 2.78.506 3.81 1.5l2.857-2.857C17.03 3.89 14.7 3 12 3A9.997 9.997 0 0 0 2.39 7.425l3.418 2.64C7.28 8.306 9.447 6.58 12 6.58z"
                                                fill="#EA4335"
                                            />
                                        </g>
                                    </svg>
                                    Continue with Google
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border/50" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-background px-4 text-muted-foreground">
                                            Quick & Secure
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        AI-powered contract analysis
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Risk detection & insights
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Secure document processing
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 text-center text-xs text-muted-foreground">
                                    By signing in, you agree to our{" "}
                                    <a
                                        href="#"
                                        className="text-primary hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-primary hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
