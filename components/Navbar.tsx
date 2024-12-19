import Link from "next/link";
import React from "react";
import GenerateButton from "./GenerateButton";

const Navbar = () => {
    return (
        <header className="sticky top-0 w-full backdrop-blur-md bg-slate-900/80 border-b border-cyan-800/20 z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-4">
                <h1 className="text-3xl font-bold tracking-tighter">
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            DerpNews
                        </span>
                    </Link>
                </h1>
                <GenerateButton />
            </div>
        </header>
    );
};

export default Navbar;
