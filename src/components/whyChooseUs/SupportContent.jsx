export default function SupportContent({ paragraph, responseTime }) {
  return (
    <>
      <p className="text-base leading-relaxed pt-6">{paragraph}</p>
      <div className="mt-8 p-4 bg-white rounded-lg border border-[var(--color-brand-blue)]/20">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">
            Gennemsnitlig responstid:
          </span>
          <span className="text-[var(--color-brand-blue)] text-lg font-bold">
            {responseTime}
          </span>
        </div>
      </div>
    </>
  );
}
