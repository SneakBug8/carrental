import { PropsWithChildren } from "react";
import React from "react";

export const ShowIf = ({ show, children }: PropsWithChildren<{ show: boolean }> = { show: true }) =>
{
  if (show) {
    return (<React.Fragment>{ children }</React.Fragment>);
  }
  else {
    return null;
  }
}