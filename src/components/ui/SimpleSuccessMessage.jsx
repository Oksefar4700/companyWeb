// src/components/ui/SimpleSuccessMessage.jsx - SIMPEL VERSION
"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SimpleSuccessMessage({
  message,
  isVisible,
  onComplete,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);

      // Auto-hide efter 3 sekunder
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`
      transform transition-all duration-400 ease-out mb-6
      ${show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
    `}
    >
      <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
        <p
          className="text-green-700 font-medium text-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
