import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import data and components
import CardContainer from "../components/CardContainer";
import cardData from "../components/CardData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import AuthModal from "../components/AuthModal";

export default function HomePage() {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

  // Fetch feedback count
  useEffect(() => {
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
    const interval = setInterval(fetchFeedbackCount, 5000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle card clicks dynamically based on card data
   * @param {string} title - The title of the clicked card
   */
  const handleCardClick = (title) => {
    // Find the card from the cardData by title
    const card = cardData.find((c) => c.title === title);

    if (card?.url) {
      // Navigate to the card's URL if it exists
      router.push(card.url);
    } else {
      // Show the "Coming Soon" modal for cards without a URL
      setShowComingSoonModal(true);
    }
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
          <CardContainer
              cards={cardData}
              onCardClick={(cardTitle) => handleCardClick(cardTitle)}
          />
        </main>

        {/* Footer */}
        <Footer feedbackCount={feedbackCount} />

        {/* Coming Soon Modal */}
        {showComingSoonModal && (
            <Modal onClose={() => setShowComingSoonModal(false)}>
              <div className="p-6 flex flex-col items-center max-w-2xl w-full">
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