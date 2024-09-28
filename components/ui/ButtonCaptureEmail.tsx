"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import apiClient from "@/libs/apiClient";
import LoaderIcon from "../elements/icons/loader";

// Capture emails for example for waitlist
const ButtonCaptureEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post("/capture-email", { email });

      toast.success("Thanks for joining the waitlist!");

      setIsDisabled(true);
      setEmail("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className={`w-full max-w-xs space-y-3 `} onSubmit={handleSubmit}>
      <input
        required
        type="email"
        disabled={isDisabled}
        value={email}
        placeholder="your@email.com"
        autoComplete="email"
        className="input input-bordered w-full placeholder:opacity-60"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        disabled={isDisabled}
        className="btn btn-primary btn-block disabled:bg-primary/50 disabled:text-neutral-content/50 disabled:cursor-not-allowed"
      >
        {isDisabled ? "Thanks for joining :)" : "Join waitlist"}
        {isLoading ? (
          <LoaderIcon className="loading-xs" />
        ) : (
          !isDisabled && <ArrowRightIcon className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default ButtonCaptureEmail;
