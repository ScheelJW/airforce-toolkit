// components/Modal.js
import React from "react";

/**
 * Basic modal for showing a message (e.g. server response) with a Close button.
 *
 * Usage:
 *  <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
 */
export const Modal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 max-w-md">
        <p className="text-lg mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
