import React, { type JSX, type PropsWithChildren } from "react";

import type { PageContentProps } from "../utils/data-types.ts";
import classes from "./PageContent.module.css";

const PageContent: React.FC<PropsWithChildren<PageContentProps>> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
