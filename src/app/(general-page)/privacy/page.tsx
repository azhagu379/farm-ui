export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <article className="prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 23, 2025</p>

        <p>
          {`Your privacy is important to us. It is FarmConnect's policy to respect
          your privacy regarding any information we may collect from you across
          our website.`}
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent.
        </p>

        {/* ... Add more sections as needed ... */}

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about how we handle user data and personal
          information, feel free to contact us at privacy@farmconnect.com.
        </p>
      </article>
    </main>
  );
}
