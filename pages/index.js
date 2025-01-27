import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Icons for your main cards
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";

// Your separate components
import Header from "../components/Header"; // NavBar only
import Footer from "../components/Footer"; // Feedback form + disclaimers
import AuthModal from "../components/AuthModal"; // If you have it separated

// Or if you keep Card, CardContent, Modal in separate files, import them:
import { Card, CardContent } from "../components/Card";
import { Modal } from "../components/Modal";

export default function HomePage() {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Auth modal states
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Next.js router
  let router;
  try {
    router = useRouter();
  } catch (e) {
    console.error("Routing unavailable in this environment");
    router = { push: (path) => console.log(`Navigate to: ${path}`) };
  }

  // Navigate to sub-pages
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Submit the feedback form
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

  // Fetch existing feedback count
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

  // Dummy login/register handlers
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

  // On mount, fetch count. Poll every 5 seconds
  useEffect(() => {
    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col min-h-screen">
      {/* Header (JUST the navbar) */}
      <Header
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Main content area */}
      <main className="px-4 sm:px-8 mb-8 mt-2 flex-1">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
          <Card onClick={() => handleNavigation("/safety-standards-briefings")}>
            <CardContent>
              <SecurityIcon className="text-blue-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Safety & Standards Briefings</h2>
              <p className="text-sm text-gray-300">Create tailored safety and standards briefings.</p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/epb-opb-drafter")}>
            <CardContent>
              <EditIcon className="text-yellow-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">EPB/OPB Drafter</h2>
              <p className="text-sm text-gray-300">Draft content and receive tailored suggestions.</p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/news-updates")}>
            <CardContent>
              <PublicIcon className="text-green-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">News & Updates</h2>
              <p className="text-sm text-gray-300">Stay updated with the latest developments.</p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/social")}>
            <CardContent>
              <ForumIcon className="text-purple-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Social Hub</h2>
              <p className="text-sm text-gray-300">
                A community-driven space for Airmen and Guardians.
              </p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/resources")}>
            <CardContent>
              <BookIcon className="text-yellow-400 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Guides & How-Tos</h2>
              <p className="text-sm text-gray-300">
                Explore guides and step-by-step how-tos.
              </p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/daf-writing-tools")}>
            <CardContent>
              <CreateIcon className="text-pink-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">DAF Writing Tools</h2>
              <p className="text-sm text-gray-300">
                Enhance your Air Force & Space Force writing tasks.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer (feedback form + disclaimers) */}
      <Footer
        feedbackCount={feedbackCount}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />

      {/* Server response modal */}
      <Modal message={modalMessage} onClose={() => setModalMessage(null)} />

      {/* Auth modals */}
      {showLogin && (
        <AuthModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSubmit={handleLoginSubmit}
          title="Login"
        />
      )}
      {showRegister && (
        <AuthModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSubmit={handleRegisterSubmit}
          title="Register"
        />
      )}
    </div>
  );
}
