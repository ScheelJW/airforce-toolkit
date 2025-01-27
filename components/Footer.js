import React, { useState } from "react";
import Modal from "./Modal"; // Ensure Modal is imported correctly

export default function Footer({ feedbackCount = 0 }) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // Feedback form modal state
  const [modalMessage, setModalMessage] = useState(null); // AI response modal state
  const [submitting, setSubmitting] = useState(false); // Submission loading state

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    setSubmitting(true);

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(data.message || "Thank you for your feedback!"); // Display AI response
        setShowFeedbackModal(false); // Close the feedback form modal
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.error || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setModalMessage("An error occurred while submitting your feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Compact Footer */}
      <div className="bg-gray-800 py-4 px-4 sm:px-8 rounded-t-2xl shadow-inner">
        <div className="flex justify-center">
          <button
            onClick={() => setShowFeedbackModal(true)} // Open feedback form modal
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
                handleSubmit(e);
              }}
              className="flex flex-col gap-4"
            >
              <textarea
                name="feedback"
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
                rows="5"
                placeholder="Share your thoughts or feedback here..."
                required
              ></textarea>
              <button
                type="submit"
                disabled={submitting}
                className={`py-2 px-4 rounded-full font-bold text-white ${
                  submitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              {feedbackCount || 0} feedbacks provided.
            </p>
          </div>
        </Modal>
      )}

      {/* AI Response Modal */}
      {modalMessage && (
        <Modal onClose={() => setModalMessage(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">AI Response</h2>
            <p className="text-gray-300 mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-full text-white font-bold"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
