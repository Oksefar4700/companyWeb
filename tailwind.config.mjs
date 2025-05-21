/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/styles/**/*.css", // Ensure CSS files are scanned for @apply
  ],
  theme: {
    extend: {
      // Future theme extensions can be added here.
    },
  },
  plugins: [
    // Future plugins can be added here.
  ],
};
export default config;
