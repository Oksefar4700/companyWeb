// src/lib/messages.js - Static message loader
import daMessages from "../messages/da.json";
import enMessages from "../messages/en.json";

const messages = {
  da: daMessages,
  en: enMessages,
};

export function getMessages(locale) {
  console.log("🔍 MESSAGE LOADER: Requested locale:", locale);
  console.log("🔍 MESSAGE LOADER: Available locales:", Object.keys(messages));

  if (!messages[locale]) {
    console.error("❌ MESSAGE LOADER: Locale not found:", locale);
    return {};
  }

  console.log(
    "✅ MESSAGE LOADER: Messages loaded for",
    locale,
    "- keys:",
    Object.keys(messages[locale])
  );
  return messages[locale];
}
