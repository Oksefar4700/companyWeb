import { Award } from "lucide-react";

export default function CustomContent({ paragraph, guarantee }) {
  return (
    <>
      <p className="text-base leading-relaxed pt-6">{paragraph}</p>
      <div className="mt-8 flex items-center justify-center">
        <div className="flex items-center p-4 bg-white rounded-full border-2 border-[var(--color-brand-blue)] w-fit">
          <Award size={22} className="text-[var(--color-brand-blue)] mr-3" />
          <span className="text-base font-bold text-[var(--color-foreground)]">
            {guarantee}
          </span>
        </div>
      </div>
    </>
  );
}
