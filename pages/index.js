import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Icons for your main cards
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import ConstructionIcon from "@mui/icons-material/Construction"; // Icon for "Coming Soon"

// Your separate components
import Header from "../components/Header"; // NavBar only
import Footer from "../components/Footer"; // Feedback modal + button included here
import Modal from "../components/Modal"; // Reusable modal
import AuthModal from "../components/AuthModal"; // Login/Register modal
import { Card, CardContent } from "../components/Card"; // Cards for main apps

export default function HomePage() {
  const [feedbackCount, setFeedbackCount] = useState(0); // Tracks the number of feedbacks
  const [showComingSoonModal, setShowComingSoonModal] = useState(false); // Controls the "Coming Soon" modal
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch feedback count from API
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

    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000); // Refresh feedback count every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    setShowComingSoonModal(true); // Open the "Coming Soon" modal
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col min-h-screen">
      {/* Header */}
      <Header
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Section */}
      <header className="relative text-center py-16 flex flex-col items-center px-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 opacity-50 blur-xl rounded-full w-96 h-96 -translate-y-32" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white z-10 drop-shadow-lg">
          Air Force Toolkit
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 z-10 text-center leading-snug max-w-2xl">
          Empowering Airmen and Guardians with cutting-edge tools
        </p>
        <h2 className="text-lg sm:text-xl font-semibold text-white z-10 mt-6">
          Select an App
        </h2>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 mb-8 mt-2 flex-1">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
          {[
            {
              icon: <SecurityIcon className="text-blue-500 text-7xl mb-4" />,
              title: "Safety & Standards Briefings",
              description: "Create tailored safety and standards briefings.",
            },
            {
              icon: <EditIcon className="text-yellow-500 text-7xl mb-4" />,
              title: "EPB/OPB Drafter",
              description: "Draft content and receive tailored suggestions.",
            },
            {
              icon: <PublicIcon className="text-green-500 text-7xl mb-4" />,
              title: "News & Updates",
              description: "Stay updated with the latest developments.",
            },
            {
              icon: <ForumIcon className="text-purple-500 text-7xl mb-4" />,
              title: "Social Hub",
              description: "A community-driven space for Airmen and Guardians.",
            },
            {
              icon: <BookIcon className="text-yellow-400 text-7xl mb-4" />,
              title: "Guides & How-Tos",
              description: "Explore guides and step-by-step how-tos.",
            },
            {
              icon: <CreateIcon className="text-pink-500 text-7xl mb-4" />,
              title: "DAF Writing Tools",
              description: "Enhance your Air Force & Space Force writing tasks.",
            },
          ].map((card, index) => (
            <div
              key={index}
              onClick={handleCardClick}
              className="cursor-default hover:scale-105 transition-transform"
            >
              <Card className="w-64 h-64">
                <CardContent className="flex flex-col justify-center items-center h-full">
                  {card.icon}
                  <h2 className="text-xl font-bold mb-2 text-center">{card.title}</h2>
                  <p className="text-sm text-gray-300 text-center">{card.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with Feedback Modal */}
      <Footer feedbackCount={feedbackCount} />

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <Modal onClose={() => setShowComingSoonModal(false)}>
          <div className="p-6 flex flex-col items-center max-w-2xl w-full">
            <ConstructionIcon className="text-yellow-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
            <p className="text-gray-300 text-center mb-4">
              This feature is under construction. Stay tuned for updates!
            </p>
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-full text-white font-bold"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Auth Modals */}
      {showLogin && (
        <AuthModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSubmit={(e) => console.log("Login submitted", e)}
          title="Login"
        />
      )}
      {showRegister && (
        <AuthModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSubmit={(e) => console.log("Register submitted", e)}
          title="Register"
        />
      )}
    </div>
  );
}
