import React, { useState } from "react";
import Modal from "./Modal"; // Ensure Modal is correctly imported

export default function Footer({ feedbackCount, handleSubmit }) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <>
      {/* Compact Footer */}
      <div className="bg-gray-800 py-4 px-4 sm:px-8 rounded-t-2xl shadow-inner">
        <div className="flex justify-center">
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Provide Feedback
          </button>
        </div>
      </div>

      {/* Disclaimers */}
      <footer className="text-center py-4 text-xs text-gray-500 bg-gray-800">
        <p>&copy; 2025 Air Force Toolkit. All rights reserved.</p>
        <p className="mt-2">
          This is not an official DoD website. Content doesn't reflect DoD views.
        </p>
        <p className="mt-2">
          Affiliate:{" "}
          <a
            href="https://automateeverything.us"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Automate Everything
          </a>
        </p>
      </footer>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <Modal onClose={() => setShowFeedbackModal(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Submit Your Feedback</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                setShowFeedbackModal(false); // Close modal after submission
              }}
              className="flex flex-col gap-4"
            >
              <textarea
                name="feedback"
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
                rows="5"
                placeholder="Share your thoughts or feedback here..."
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-full text-white font-bold"
              >
                Submit Feedback
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              {feedbackCount || 0} feedbacks provided.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
