import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EPB_OPB_Drafter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow text-center px-8 sm:px-16">
        <h1 className="text-4xl font-extrabold mb-4">EPB/OPB Drafter</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Create, edit, and refine your Enlisted/Officer Performance Briefs with ease. This tool helps
          structure and improve your performance reports efficiently.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default EPB_OPB_Drafter;
