// middleware.js (root folder)
import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  locales: ["da", "en"],
  defaultLocale: "da",
});

export default function (request) {
  console.log("🔍 MIDDLEWARE: Processing request:", request.nextUrl.pathname);

  try {
    const response = middleware(request);
    console.log("✅ MIDDLEWARE: Success");
    return response;
  } catch (error) {
    console.error("❌ MIDDLEWARE ERROR:", error);
    throw error;
  }
}

export const config = {
  matcher: ["/", "/(da|en)/:path*"],
};
