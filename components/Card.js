import React from "react";

/** Named export for Card */
export function Card({ children, className, onClick }) {
  return (
    <div
      className={
        "w-72 rounded-2xl shadow-lg bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 hover:from-blue-900 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl " +
        (className || "")
      }
      onClick={onClick}
      style={{
        padding: "2rem",
        cursor: onClick ? "pointer" : "default",
        border: "1px solid #ffffff",
      }}
    >
      {children}
    </div>
  );
}

/** Named export for CardContent */
export function CardContent({ children, className }) {
  return (
    <div
      className={"p-4 text-center " + (className || "")}
      style={{ color: "#e0e7ff" }}
    >
      {children}
    </div>
  );
}
