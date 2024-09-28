"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";

const RootClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Wrap the app with SessionProvider to enable authentication */}
      <SessionProvider>
        {/* Show messages anywhere in the app with toast() */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* App content  */}
        {children}

        {/* Show tooltips if element has 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />
      </SessionProvider>
    </>
  );
};

export default RootClientLayout;
