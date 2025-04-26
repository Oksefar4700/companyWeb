const packages = [
  {
    title: "Portfolio-pakke",
    price: "6.000 kr.",
    description:
      "3 sider (Forside, Services/Portfolio, Kontakt), kontaktformular, basis-SEO, SSL, responsivt, 1 feedback",
  },
  {
    title: "Webshop Basic",
    price: "10.000 kr.",
    description:
      "Op til 20 produkter, betalingsgateway (Stripe/PayPal), SSL, responsivt design, deployment",
  },
  {
    title: "Webshop Standard",
    price: "20.000 kr.",
    description:
      "Op til 100 produkter, lagerstyring, kunde-login, mail-integration, GDPR, SSL",
  },
  {
    title: "Webshop Premium",
    price: "35.000 kr.",
    description:
      "Ubegrænsede produkter, avancerede søge-/filterfunktioner, headless CMS, performance-audit",
  },
  {
    title: "Booking Basis",
    price: "8.000 kr.",
    description:
      "Enkel kalender-widget, e-mail-bekræftelser, 1-bruger admin, responsivt design",
  },
  {
    title: "Booking Pro",
    price: "15.000 kr.",
    description:
      "Op til 3 services/kalendere, SMS-påmindelser, betalingsintegration, kunde-login, GDPR",
  },
  {
    title: "Booking Enterprise",
    price: "25.000 kr.",
    description:
      "Google/Outlook-sync, CRM-integration, API-adgang, avanceret rapportering",
  },
];

export default function Packages() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <div
          key={pkg.title}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-2xl font-semibold mb-2">{pkg.title}</h4>
            <p className="text-3xl font-bold text-indigo-600 mb-4">
              {pkg.price}
            </p>
            <p className="text-gray-600">{pkg.description}</p>
          </div>
          <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Vælg pakke
          </button>
        </div>
      ))}
    </div>
  );
}
