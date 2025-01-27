import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

// Import the new Header and Footer
import Header from "../components/Header";
import Footer from "../components/Footer";

// Reuse your Input, AuthModal, Card, etc. if they're not used in multiple places
// Otherwise, you may want them in separate files too.
import AuthModal from "../components/AuthModal"; // If you extracted it
import { Card, CardContent, Modal } from "../components/..."; // Pseudocode

const HomePage = () => {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Auth modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let router;
  try {
    const { useRouter } = require("next/router");
    router = useRouter();
  } catch (e) {
    console.error("Routing unavailable in this environment");
    router = { push: (path) => console.log(`Navigate to: ${path}`) };
  }

  // Navigation
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Feedback
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
        setModalMessage(data.message);
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setModalMessage("An error occurred while processing your feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  // For demonstration only
  const fetchFeedbackCount = async () => {
    try {
      const response = await fetch("/api/feedback-count");
      if (response.ok) {
        const data = await response.json();
        setFeedbackCount(data.count);
      }
    } catch (error) {
      console.error("Error fetching feedback count:", error);
    }
  };

  // Dummy login/register
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Logging in with", email, password);
    setShowLogin(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const baseName = e.target.baseName.value;
    const afsc = e.target.afsc.value;
    console.log("Registering with", email, password, baseName, afsc);
    setShowRegister(false);
  };

  useEffect(() => {
    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col min-h-screen">
      {/* Use the new Header component */}
      <Header
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-8 mb-8 mt-2 flex-1">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
          <Card onClick={() => handleNavigation("/safety-standards-briefings")}>
            <CardContent>
              <SecurityIcon className="text-blue-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Safety & Standards Briefings</h2>
              <p className="text-sm text-gray-300">Create tailored safety and standards briefings.</p>
            </CardContent>
          </Card>
          {/* ... repeat for each card ... */}
        </div>
      </main>

      {/* FEEDBACK SECTION */}
      <div className="bg-gray-800 py-6 px-4 sm:px-8 rounded-t-2xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">Suggestions & Feedback</h2>
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
            className={`px-6 py-2 ${
              submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold rounded-full shadow-lg transition`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* Use new Footer component */}
      <Footer />

      {/* Server response modal */}
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}

      {/* Auth modals */}
      <AuthModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLoginSubmit}
        title="Login"
      />
      <AuthModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSubmit={handleRegisterSubmit}
        title="Register"
      />
    </div>
  );
};

export default HomePage;
