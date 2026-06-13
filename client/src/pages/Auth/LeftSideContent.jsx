import React from "react";
import logo from "../../../public/logo.png";

function LeftSideContent() {
  return (
    <>
      <div className="col-span-5 hidden md:block bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="h-full flex flex-col justify-center px-14 text-white">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-12 rounded-md bg-white p-1" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Travel Desk
            </h2>
          </div>
          <p className="mt-8 text-base font-light text-slate-300 leading-relaxed max-w-[22rem]">
            Multi-level approval matrix ensuring transparent, role-based
            validation across manager, HR, and booking workflows.
          </p>
          <div className="mt-12 h-px w-14 bg-slate-600/70" />
          <p className="mt-5 text-xs font-medium text-slate-400 tracking-[0.25em] uppercase">
            Secure • Scalable • Role-Based Access
          </p>
        </div>
      </div>
    </>
  );
}

export default LeftSideContent;
