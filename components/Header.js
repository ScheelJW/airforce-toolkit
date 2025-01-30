import React from "react";
import Link from "next/link";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function Header({ onLoginClick, onRegisterClick }) {
    return (
        <nav className="flex justify-between items-center px-4 py-4 bg-gray-900 text-white shadow-lg">
            {/* Wrap Icon and Title in Link */}
            <Link href="/" className="flex items-center space-x-2">
                <MilitaryTechIcon className="text-blue-500 text-3xl" />
                <span className="font-bold text-xl">Air Force Toolkit</span>
            </Link>

            <div className="flex space-x-4">
                <button
                    onClick={onLoginClick}
                    className="bg-blue-700 hover:bg-blue-800 py-1 px-4 rounded-full transition"
                >
                    Login
                </button>
                <button
                    onClick={onRegisterClick}
                    className="border border-blue-700 hover:border-blue-800 py-1 px-4 rounded-full transition"
                >
                    Register
                </button>
            </div>
        </nav>
    );
}