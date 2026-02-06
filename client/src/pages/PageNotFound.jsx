import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <MdSearchOff className="text-gray-400 text-6xl" />
        </div>
        <h1 className="text-4xl font-medium text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-2">Page not found</p>
        <p className="text-sm text-gray-500 mb-8">
          Oops! The page you are looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2.5 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
        <p className="mt-4 text-xs text-gray-400">
          Redirecting you automatically…
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
