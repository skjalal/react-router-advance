import React, { type JSX } from "react";
import PageContent from "../components/PageContent";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
    </PageContent>
  );
};

export default HomePage;
