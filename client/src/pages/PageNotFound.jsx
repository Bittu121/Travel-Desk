import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlPlane } from "react-icons/sl";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center w-full max-w-md">
        <div className="flex justify-center mb-6">
          <SlPlane className="text-blue-600 text-5xl animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-700 mb-3">
          404 - Page Not Found
        </h1>
        <p className="text-base text-gray-500 mb-6">
          Oops! The page you are looking for doesn’t exist.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
