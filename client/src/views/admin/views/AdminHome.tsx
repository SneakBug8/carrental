import React from "react";
import { ModelSelector } from "../partials/ModelSelector";

export class AdminHome extends React.Component
{
  render()
  {
    return (
      <div>
          <p>
            AdminHome
        </p>
        <ModelSelector callback={(str) => console.log(str)}/>
        </div>
    );
  }
}
