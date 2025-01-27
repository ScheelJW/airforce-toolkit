export default function HomePage() {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Auth modal states
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let router;
  try {
    router = useRouter();
  } catch (error) {
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
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setModalMessage("An error occurred while processing your feedback.");
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col min-h-screen">
      {/* Header */}
      <Header
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Section */}
      <header className="relative text-center py-16 flex flex-col items-center px-4">
        {/* Background Circle */}
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
      <main className="px-4 sm:px-8 mb-16 mt-4 flex-1">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto items-stretch">
          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <SecurityIcon className="text-blue-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Safety & Standards Briefings</h2>
              <p className="text-sm text-gray-300 text-center">
                Create tailored safety and standards briefings.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <EditIcon className="text-yellow-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">EPB/OPB Drafter</h2>
              <p className="text-sm text-gray-300 text-center">
                Draft content and receive tailored suggestions.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <PublicIcon className="text-green-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">News & Updates</h2>
              <p className="text-sm text-gray-300 text-center">
                Stay updated with the latest developments.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <ForumIcon className="text-purple-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Social Hub</h2>
              <p className="text-sm text-gray-300 text-center">
                A community-driven space for Airmen and Guardians.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <BookIcon className="text-yellow-400 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">Guides & How-Tos</h2>
              <p className="text-sm text-gray-300 text-center">
                Explore guides and step-by-step how-tos.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <CreateIcon className="text-pink-500 text-7xl mb-4" />
              <h2 className="text-xl font-bold mb-2">DAF Writing Tools</h2>
              <p className="text-sm text-gray-300 text-center">
                Enhance your Air Force & Space Force writing tasks.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer
        feedbackCount={feedbackCount}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />

      {/* Server Response Modal */}
      <Modal message={modalMessage} onClose={() => setModalMessage(null)} />

      {/* Auth Modals */}
      {showLogin && (
        <AuthModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSubmit={(e) => handleLoginSubmit(e)}
          title="Login"
        />
      )}
      {showRegister && (
        <AuthModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSubmit={(e) => handleRegisterSubmit(e)}
          title="Register"
        />
      )}
    </div>
  );
}
