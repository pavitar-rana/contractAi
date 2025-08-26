"use client";

import React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AcmeIcon } from "./social";
import { ArrowRight, Menu, X } from "lucide-react";

const menuItems = [
    "About",
    "Blog",
    "Customers",
    "Pricing",
    "Enterprise",
    "Changelog",
    "Documentation",
    "Contact Us",
];

const BasicNavbar = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav
            ref={ref}
            {...props}
            className={cn(
                "border-b border-default-100 bg-transparent",
                isMenuOpen && "bg-muted/50 dark:bg-muted/50",
                "w-full flex justify-center items-center h-[60px] px-4",
                className
            )}
        >
            {/* Left Content */}
            <div className="flex items-center gap-2 mr-8">
                <div className="bg-foreground text-background rounded-full">
                    <AcmeIcon size={34} />
                </div>
                <span className="text-sm text-foreground ml-2 font-medium">
                    ACME
                </span>
            </div>

            {/* Center Content */}
            <NavigationMenu className="flex-1 hidden md:flex justify-center">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="#"
                            className="text-foreground font-medium px-3 py-2"
                            aria-current="page"
                        >
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="#"
                            className="text-muted-foreground px-3 py-2"
                        >
                            Features
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="#"
                            className="text-muted-foreground px-3 py-2"
                        >
                            Customers
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="#"
                            className="text-muted-foreground px-3 py-2"
                        >
                            About Us
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="#"
                            className="text-muted-foreground px-3 py-2"
                        >
                            Integrations
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Content */}
            <div className="hidden md:flex items-center ml-auto gap-2">
                <Button
                    variant="ghost"
                    className="text-muted-foreground"
                    size="sm"
                >
                    Login
                </Button>
                <Button
                    variant="secondary"
                    className="bg-foreground text-background font-medium"
                    size="sm"
                >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-auto">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen((v) => !v)}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-x-0 top-[60px] z-50 bg-muted/80 dark:bg-muted/80 shadow-md pt-6 pb-6 backdrop-blur-md backdrop-saturate-150 md:hidden animate-in fade-in slide-in-from-top-4">
                    <div className="px-4 flex flex-col gap-2">
                        <Button
                            asChild
                            variant="outline"
                            className="mb-2"
                            size="lg"
                        >
                            <Link href="/">Sign In</Link>
                        </Button>
                        <Button
                            asChild
                            className="bg-foreground text-background mb-4"
                            size="lg"
                        >
                            <Link href="/">Get Started</Link>
                        </Button>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={item}>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="justify-start w-full text-muted-foreground"
                                    size="lg"
                                >
                                    <a href="#">{item}</a>
                                </Button>
                                {index < menuItems.length - 1 && (
                                    <Separator className="opacity-50" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
});

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;
