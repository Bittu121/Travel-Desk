// import React from "react";

// function AppliedFormTravelers({ item, id }) {
//   return (
//     <>
//       <div>
//         <h2>AppliedFormTravelers</h2>
//       </div>
//     </>
//   );
// }

// export default AppliedFormTravelers;
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function AppliedFormTravelers({ item = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Calculate position
  const getPosition = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
    };
  };

  const position = isOpen && buttonRef.current ? getPosition() : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
      >
        View Travelers
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed z-[9999] w-80 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fadeIn"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50 rounded-t-2xl">
              <h3 className="text-sm font-semibold text-gray-800">Travelers</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="max-h-64 overflow-y-auto p-4 space-y-3">
              {item.length === 0 ? (
                <p className="text-sm text-gray-500">No travelers found</p>
              ) : (
                item.map((traveler) => (
                  <div
                    key={traveler?._id}
                    className="p-3 rounded-lg border border-gray-100 bg-white hover:shadow-sm transition"
                  >
                    <p className="text-sm">
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      {traveler?.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-600">Age:</span>{" "}
                      {traveler?.age}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-600">Gender:</span>{" "}
                      {traveler?.gender}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default AppliedFormTravelers;
