import React from "react";

export default function Footer({ feedbackCount, submitting, handleSubmit }) {
  return (
    <>
      <div className="bg-gray-800 py-6 px-4 sm:px-8 rounded-t-2xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">
          Suggestions &amp; Feedback
        </h2>
        <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
          <div className="w-full max-w-3xl relative">
            <textarea
              name="feedback"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
              rows="5"
              placeholder="Share your thoughts or feedback here..."
            />
            <p className="absolute bottom-2 right-3 text-xs text-gray-400">
              {feedbackCount} feedbacks provided.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 ${
              submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold rounded-full shadow-lg transition`}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      <footer className="text-center py-6 text-xs text-gray-500 bg-gray-800">
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
    </>
  );
}
