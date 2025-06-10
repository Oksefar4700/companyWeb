// src/app/[locale]/layout.js
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "../../lib/messages"; // Import our static loader

const locales = ["da", "en"];

export function generateStaticParams() {
  console.log("🔍 GENERATING STATIC PARAMS for locales:", locales);
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  console.log("🔍 LOCALE LAYOUT: Raw params received:", params);

  try {
    const { locale } = await params;
    console.log("🔍 LOCALE LAYOUT: Extracted locale:", locale);

    if (!locales.includes(locale)) {
      console.error("❌ INVALID LOCALE:", locale);
      notFound();
    }

    console.log("✅ LOCALE LAYOUT: Loading messages via static loader...");

    // 🔧 Use static message loader instead of dynamic imports
    const messages = getMessages(locale);

    return (
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error("❌ LOCALE LAYOUT ERROR:", error);
    return (
      <div style={{ padding: "50px", color: "red" }}>
        <h1>Locale Layout Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
}
