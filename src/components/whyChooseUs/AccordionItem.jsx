import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AccordionItem({
  icon: Icon,
  title,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-[var(--color-brand-blue)]/30 transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center mr-4">
            <Icon size={20} />
          </div>
          <h3 className="font-bold text-lg text-[var(--color-foreground)]">
            {title}
          </h3>
        </div>
        {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 bg-[var(--color-brand-blue-lighter-bg)] border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
