// app/head.js (opdateret)
export default function Head() {
  return (
    <>
      <title>CompanyWeb - Professionelle React-baserede webløsninger</title>
      <meta
        name="description"
        content="Skræddersyede webløsninger – fra iøjnefaldende portfolioer til avancerede webshops og bookingsystemer. Med React-teknologi og 24/7 support."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta
        property="og:title"
        content="CompanyWeb - Professionelle webløsninger"
      />
      <meta
        property="og:description"
        content="Skræddersyede React-baserede webløsninger med fokus på hastighed og brugeroplevelse."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ditdomæne.dk/" />
      <meta
        property="og:image"
        content="https://ditdomæne.dk/images/og-image.jpg"
      />
      <link rel="canonical" href="https://ditdomæne.dk/" />
      <link rel="icon" href="/favicon.ico" />
      <script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        defer
      ></script>
    </>
  );
}
