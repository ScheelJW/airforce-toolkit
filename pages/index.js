import React, { useEffect, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useRouter } from "next/router";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

// NavBar with Login/Register
const NavBar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="flex justify-between items-center px-4 py-4 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center space-x-2">
        <MilitaryTechIcon className="text-blue-500 text-3xl" /><span className="font-bold text-xl">Air Force Toolkit</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onLoginClick}
          className="bg-blue-700 hover:bg-blue-800 py-1 px-4 rounded-full transition"
        >
          Login
        </button>
        <button
          onClick={onRegisterClick}
          className="border border-blue-700 hover:border-blue-800 py-1 px-4 rounded-full transition"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

// Reusable input
const Input = ({ label, type = "text", name, required = false, options }) => {
  // If "options" is passed, render a <select> instead of <input>
  if (options) {
    return (
      <label className="block mb-3">
        <span className="block mb-1 text-gray-200 font-semibold">{label}</span>
        <select
          name={name}
          required={required}
          className="w-full p-3 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block mb-3">
      <span className="block mb-1 text-gray-200 font-semibold">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full p-3 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
};

// Auth Modal with separate login & register styling
const AuthModal = ({ isOpen, onClose, onSubmit, title }) => {
  if (!isOpen) return null;

  const isRegister = title === "Register";

  // Decide on a nice gradient & side text depending on login/register
  const gradientBg = isRegister
    ? "from-blue-600 to-indigo-600"
    : "from-teal-600 to-green-600";

  const sideTitle = isRegister ? "Why Register?" : "Welcome Back!";

  // For the register side panel, we had bullet points. For login, we can add a simple message.
  const sideParagraph = isRegister
    ? [
        "Exclusive Air Force & Space Force Tools",
        "Private Community & Secure Discussions",
        "Early Access to Upcoming Features",
        "Personalized Dashboard & Alerts",
      ]
    : ["Access your account to keep learning and contributing.", "We missed you!"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="relative bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-lg md:max-w-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-100 transition"
        >
          <CloseIcon />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side: a modern gradient panel */}
          <div className={`hidden md:flex flex-col justify-center items-start p-8 bg-gradient-to-br ${gradientBg} text-white`}>
            <h3 className="text-2xl font-bold mb-4">{sideTitle}</h3>
            {isRegister ? (
              <ul className="list-disc list-inside space-y-2 text-sm leading-snug">
                {sideParagraph.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              // For login, just show paragraphs
              <div className="space-y-2 text-sm leading-snug">
                {sideParagraph.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            )}
            {isRegister && (
              <p className="mt-4 text-sm font-semibold">Join us and take flight!</p>
            )}
          </div>

          {/* Right side: the form */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{title}</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Input label="Email" name="email" type="email" required />
              <Input label="Password" name="password" type="password" required />
              {isRegister && (
                <>
                  {/* Base Name Dropdown */}
                  <Input
                    label="Base Name"
                    name="baseName"
                    required
                    options={[
                      "Andrews AFB",
                      "Ramstein AB",
                      "Eglin AFB",
                      "Lackland AFB",
                    ]}
                  />
                  {/* AFSC Dropdown */}
                  <Input
                    label="AFSC"
                    name="afsc"
                    required
                    options={[
                      "1N0X1 - All-Source Intelligence",
                      "1A0X1 - In-Flight Refueling",
                      "2A3X3 - Tactical Aircraft Maintenance",
                      "3S0X1 - Personnel",
                    ]}
                  />
                </>
              )}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-full font-bold transition w-full text-lg"
              >
                {title}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card for each main app
const Card = ({ children, className, onClick }) => (
  <div
    className={`w-72 rounded-2xl shadow-lg bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 hover:from-blue-900 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
    onClick={onClick}
    style={{
      padding: "2rem",
      cursor: onClick ? "pointer" : "default",
      border: "1px solid #ffffff"
    }}
  >
    {children}
  </div>
);

// Card content
const CardContent = ({ children, className }) => (
  <div className={`p-4 text-center ${className}`} style={{ color: "#e0e7ff" }}>
    {children}
  </div>
);

// Basic modal for showing server response messages
const Modal = ({ message, onClose }) => (
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

  // Navigate to different pages
  const handleNavigation = (path) => {
    router.push(path);
  };

  // Submit the feedback form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    setSubmitting(true);

    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      console.error('Error submitting feedback:', error);
      setModalMessage('An error occurred while processing your feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchFeedbackCount = async () => {
    try {
      const response = await fetch('/api/feedback-count');
      if (response.ok) {
        const data = await response.json();
        setFeedbackCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching feedback count:', error);
    }
  };

  // Dummy login/register handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // Perform login logic here
    console.log("Logging in with", email, password);
    setShowLogin(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const baseName = e.target.baseName.value;
    const afsc = e.target.afsc.value;
    // Perform registration logic here
    console.log("Registering with", email, password, baseName, afsc);
    setShowRegister(false);
  };

  useEffect(() => {
    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col">
      {/* NavBar */}
      <NavBar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Header / Hero Section */}
      <header className="relative text-center py-10 flex flex-col items-center overflow-hidden px-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 opacity-50 blur-xl rounded-full w-72 h-72 -translate-y-20" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-white z-10 drop-shadow-lg">
          Air Force Toolkit
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 z-10 text-center leading-snug max-w-xl">
          Empowering Airmen and Guardians with cutting-edge tools
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white z-10 mt-4">Select an App</h2>
      </header>

      {/* Main Content */}
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
              <p className="text-sm text-gray-300">A community-driven space for Airmen and Guardians.</p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/resources")}>  
            <CardContent>
              <BookIcon className="text-yellow-400 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Guides & How-Tos</h2>
              <p className="text-sm text-gray-300">Explore guides and step-by-step how-tos.</p>
            </CardContent>
          </Card>

          <Card onClick={() => handleNavigation("/daf-writing-tools")}>  
            <CardContent>
              <CreateIcon className="text-pink-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">DAF Writing Tools</h2>
              <p className="text-sm text-gray-300">Enhance your Air Force & Space Force writing tasks.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Feedback Section */}
      <div className="bg-gray-800 py-6 px-4 sm:px-8 rounded-t-2xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">Suggestions & Feedback</h2>
        <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
          <div className="w-full max-w-3xl relative">
            <textarea
              name="feedback"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
              rows="5"
              placeholder="Share your thoughts or feedback here..."
            ></textarea>
            <p className="absolute bottom-2 right-3 text-xs text-gray-400">{feedbackCount} feedbacks provided.</p>
          </div>
          <button
            type="submit"
            className={`px-6 py-2 ${submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold rounded-full shadow-lg transition`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-500">
        <p>&copy; 2025 Air Force Toolkit. All rights reserved.</p>
        <p className="mt-2">This is not an official DoD website. Content doesn't reflect DoD views.</p>
        <p className="mt-2">Affiliate: <a href="https://automateeverything.us" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">Automate Everything</a></p>
      </footer>

      {/* Server response modal */}
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}

      {/* Auth modals for Login and Register */}
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

// TEST CASES
// 1) Renders main heading 'Air Force Toolkit' without crashing.
// 2) Submits feedback successfully and triggers the handleSubmit function.
// 3) Clicking NavBar Login opens AuthModal (Login), Register opens AuthModal (Register).
// 4) Icons are larger (7xl) for the main app cards.
// 5) AuthModals are styled with distinct left panels for login & register.
// 6) Register modal includes Base Name and AFSC dropdowns.
