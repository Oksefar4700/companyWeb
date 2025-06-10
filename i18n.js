// i18n.js (root folder)
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["da", "en"];

export default getRequestConfig(({ locale }) => {
  console.log("🔍 I18N CONFIG: Requested locale:", locale);

  // 🔧 Handle undefined locale (silent fallback)
  if (locale === undefined || locale === null) {
    // console.error("❌ I18N CONFIG: Locale is undefined - using fallback"); // Removed to reduce noise
    locale = "da";
  }

  if (!locales.includes(locale)) {
    console.error("❌ I18N CONFIG: Invalid locale:", locale);
    notFound();
  }

  try {
    console.log("🔍 I18N CONFIG: Loading messages via direct import...");

    // 🔧 Use direct imports instead of dynamic loader
    let messages = {};
    if (locale === "da") {
      messages = require("./src/messages/da.json");
    } else if (locale === "en") {
      messages = require("./src/messages/en.json");
    }

    console.log(
      "✅ I18N CONFIG: Messages loaded, keys:",
      Object.keys(messages)
    );

    // 🔧 Return both messages AND locale
    return {
      messages,
      locale,
    };
  } catch (error) {
    console.error("❌ I18N CONFIG: Error loading messages:", error);
    throw error;
  }
});
