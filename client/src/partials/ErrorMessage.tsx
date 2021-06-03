import React, { useEffect } from "react";
import { Requisite } from "../Requisite";

export const ErrorMessage = ({ requisite }: { requisite: Requisite }) =>
{
  if (requisite.result) {
    return null;
  }

  return (
    <div className="alert alert-danger">
      {requisite._code} {requisite.message}
    </div>
  );
}