import React from "react";
import { Requisite } from "../Requisite";

export class ErrorMessage extends React.Component<{ requisite: Requisite }>
{
  render()
  {
    if (this.props.requisite.result) {
      return null;
    }

    return (
      <div className="alert alert-danger">
        {this.props.requisite.code} {this.props.requisite.message}
      </div>
    );
  }
}