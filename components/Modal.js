// components/Modal.js
import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
