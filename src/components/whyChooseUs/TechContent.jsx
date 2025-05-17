import { CheckCircle2 } from "lucide-react";

export default function TechContent({ paragraph, benefits }) {
  return (
    <>
      <p className="text-base leading-relaxed pt-6">{paragraph}</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center p-2">
            <CheckCircle2
              size={18}
              className="text-[var(--color-brand-blue)] mr-3"
            />
            <span className="text-base">{b}</span>
          </div>
        ))}
      </div>
    </>
  );
}
