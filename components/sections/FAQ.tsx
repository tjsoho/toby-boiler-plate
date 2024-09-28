"use client";
import React, { useRef, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is included in the Hobby Plan?",
    answer:
      "It’s perfect for individual developers or small projects looking to get started quickly.",
  },
  {
    question: "Can I upgrade from the Hobby Plan to the Team Plan later?",
    answer:
      "Absolutely! You can upgrade to the Team Plan at any time directly from your account dashboard.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Very important to answer it here. You can refund within 30 days of purchase.",
  },
  {
    question: "How do you make holy water? 🤔",
    answer: "You boil the hell out of it.",
  },
  // More questions...
];

const FaqItem = ({ faqItem }: { faqItem: FAQItem }) => {
  const accordionRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const getAccordionStyle = () => ({
    maxHeight: isOpen ? accordionRef.current?.scrollHeight : 0,
    opacity: isOpen ? 1 : 0,
  });

  return (
    <li className="list-none">
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {faqItem?.question}
        </span>
        {isOpen ? (
          <MinusIcon className="fill-current w-6 h-6 transform origin-center transition duration-200 ease-out" />
        ) : (
          <PlusIcon className="fill-current w-6 h-6 transform origin-center transition duration-200 ease-out" />
        )}
      </button>

      <div
        ref={accordionRef}
        className={`transition-all duration-200 ease-in-out opacity-80 overflow-hidden`}
        style={getAccordionStyle()}
      >
        <div className="pb-5 leading-relaxed">{faqItem?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section id="faq">
      <div className="mx-auto max-w-7xl px-8 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold leading-10 tracking-tight text-content">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base leading-7 text-base-content-secondary">
              Can’t find the answer you’re looking for? Reach out to our{" "}
              <a
                href="mailto:youremail@gmail.com"
                className="font-bold hover:underline"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            {faqs.map((faq, i) => (
              <div key={i}>
                <FaqItem faqItem={faq} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
