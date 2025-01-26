import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import EditIcon from "@mui/icons-material/Edit";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create"; // Icon for DAF Writing Tools

const Card = ({ children, className, onClick }) => (
  <div
    className={`rounded-2xl shadow-lg bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 hover:from-blue-900 hover:to-blue-700 ${className}`}
    onClick={onClick}
    style={{ padding: "1.5rem", cursor: onClick ? "pointer" : "default", transition: "all 0.3s ease-in-out", border: "1px solid #ffffff" }}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 text-center ${className}`} style={{ color: "#e0e7ff" }}>
    {children}
  </div>
);

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

  let router;
  try {
    const { useRouter } = require("next/router");
    router = useRouter();
  } catch (e) {
    console.error("Routing unavailable in this environment");
    router = { push: (path) => console.log(`Navigate to: ${path}`) };
  }

  const handleNavigation = (path) => {
    router.push(path);
  };

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
      setModalMessage(data.message); // Show the AI response in the modal
    } else {
      const errorData = await response.json();
      setModalMessage(errorData.error); // Show the humorous rejection message in the modal
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

  useEffect(() => {
    // Fetch the initial feedback count and set up polling
    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col justify-between">
      <header className="relative text-center py-16 flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 opacity-50 blur-xl rounded-full w-72 h-72 -translate-y-20" />
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight text-white z-10 drop-shadow-lg">Air Force Toolkit</h1>
        <p className="text-lg text-gray-300 z-10">Empowering Airmen and Guardians with cutting-edge tools</p>
      </header>

      <main className="px-8 sm:px-16 mb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/safety-standards-briefings")}
          >
            <CardContent>
              <SecurityIcon className="text-blue-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">Safety & Standards Briefings</h2>
              <p className="text-lg text-gray-300">
                Create tailored safety and standards briefings with ease.
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/epb-opb-drafter")}
          >
            <CardContent>
              <EditIcon className="text-yellow-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">EPB/OPB Drafter</h2>
              <p className="text-lg text-gray-300">
                Draft content and receive tailored suggestions to enhance your performance reports.
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/news-updates")}
          >
            <CardContent>
              <PublicIcon className="text-green-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">News & Updates</h2>
              <p className="text-lg text-gray-300">
                Stay updated with the latest developments in the Air Force and Space Force.
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/social")}
          >
            <CardContent>
              <ForumIcon className="text-purple-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">Social Hub</h2>
              <p className="text-lg text-gray-300">
                Share your thoughts, ideas, and updates in a community-driven space for Airmen and Guardians.
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/resources")}
          >
            <CardContent>
              <BookIcon className="text-yellow-400 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">Guides & How-Tos</h2>
              <p className="text-lg text-gray-300">
                Explore detailed guides and step-by-step how-tos to enhance your knowledge and skills.
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-2xl transform hover:scale-105"
            onClick={() => handleNavigation("/daf-writing-tools")}
          >
            <CardContent>
              <CreateIcon className="text-pink-500 text-5xl mb-4" />
              <h2 className="text-3xl font-bold mb-2">DAF Writing Tools</h2>
              <p className="text-lg text-gray-300">
                Streamline and enhance your Air Force and Space Force writing tasks.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="bg-gray-800 py-10 px-8 sm:px-16 rounded-t-2xl shadow-inner relative">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Suggestions & Feedback</h2>
        <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
          <div className="w-full max-w-3xl relative">
            <textarea
              name="feedback"
              className="w-full p-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
              rows="5"
              placeholder="Share your thoughts or feedback here..."
            ></textarea>
            <p className="absolute bottom-2 right-4 text-sm text-gray-400">{feedbackCount} feedbacks provided.</p>
          </div>
          <button
            type="submit"
            className={`px-8 py-3 ${submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold rounded-full shadow-lg transform transition`} disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      <footer className="text-center py-8 text-sm text-gray-500">
        <p>&copy; 2025 Air Force Toolkit. All rights reserved.</p>
        <p className="text-xs mt-4">This is not an official website of the Department of Defense (DoD). The content presented here does not reflect the views or policies of the DoD or any of its components.</p>
        <p className="text-xs mt-4">Affiliate: <a href="https://automateeverything.us" className="text-blue-400 hover:underline" target="_blank">Automate Everything</a></p>
      </footer>

      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
    </div>
  );
};

export default HomePage;
