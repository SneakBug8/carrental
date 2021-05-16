import React from "react";
import { Requisite } from "../Requisite";

export const ErrorMessage = ({ requisite }: { requisite: Requisite }) =>
{
  if (requisite.result) {
    return null;
  }

  return (
    <div className="alert alert-danger">
      {requisite.code} {requisite.message}
    </div>
  );
}