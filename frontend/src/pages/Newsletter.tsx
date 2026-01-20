import React, { type JSX } from "react";

import NewsletterSignup from "../components/NewsletterSignup.tsx";
import PageContent from "../components/PageContent.tsx";

const NewsletterPage: React.FC = (): JSX.Element => {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
};

export default NewsletterPage;
