// components/AuthModal.js
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

// If you keep a separate Input.js, import it here.
// For now, we'll inline a minimal Input component:
const Input = ({ label, type = "text", name, required = false, options }) => {
  // If "options" array is provided, render a dropdown
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
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  // Otherwise, standard text/password/email input
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

/**
 * AuthModal: Renders either a Login or Register form,
 * with a left gradient panel describing benefits if it's Register mode.
 */
const AuthModal = ({ isOpen, onClose, onSubmit, title }) => {
  if (!isOpen) return null;

  const isRegister = title === "Register";

  // Decide on a gradient background for the left panel
  const gradientBg = isRegister
    ? "from-blue-600 to-indigo-600"
    : "from-teal-600 to-green-600";

  // Side panel text
  const sideTitle = isRegister ? "Why Register?" : "Welcome Back!";
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-100 transition"
        >
          <CloseIcon />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left gradient panel */}
          <div
            className={`hidden md:flex flex-col justify-center items-start p-8 bg-gradient-to-br ${gradientBg} text-white`}
          >
            <h3 className="text-2xl font-bold mb-4">{sideTitle}</h3>
            {isRegister ? (
              <ul className="list-disc list-inside space-y-2 text-sm leading-snug">
                {sideParagraph.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
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

          {/* Right form panel */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {title}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Input label="Email" name="email" type="email" required />
              <Input label="Password" name="password" type="password" required />

              {/* If Register, show BaseName & AFSC dropdowns */}
              {isRegister && (
                <>
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

export default AuthModal;
