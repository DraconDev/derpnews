import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-400 text-sm">
                    © {new Date().getFullYear()} DerpNews - Your Source for
                    <span className="text-cyan-400"> AI-Generated Satire</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
