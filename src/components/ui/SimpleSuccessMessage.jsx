// src/components/ui/SimpleSuccessMessage.jsx - Professionel version
"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function SimpleSuccessMessage({
  message,
  isVisible,
  onComplete,
  type = "success",
  duration = 3000,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);

      // Auto-hide efter specificeret varighed
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, onComplete, duration]);

  // Konfiguration baseret på message type
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          textColor: "text-green-700",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          textColor: "text-red-700",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          iconColor: "text-amber-600",
          textColor: "text-amber-700",
        };
      case "info":
        return {
          icon: Info,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          textColor: "text-blue-700",
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          textColor: "text-green-700",
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  if (!isVisible) return null;

  return (
    <div
      className={`
      transform transition-all duration-400 ease-out mb-6
      ${show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
    `}
    >
      <div
        className={`flex items-center justify-center p-4 ${config.bgColor} ${config.borderColor} border rounded-lg`}
      >
        <IconComponent
          className={`h-5 w-5 ${config.iconColor} mr-2 flex-shrink-0`}
        />
        <p
          className={`${config.textColor} font-medium text-center`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
