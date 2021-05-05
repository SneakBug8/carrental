import React from "react";

export class AdminSidebar extends React.Component
{
  render()
  {
    return (
      <ul className="list-group">
        <li className="list-group-item"><a href="/admin/cars">Edit cars</a></li>
        <li className="list-group-item"><a href="/admin/locations">Edit locations</a></li>
      </ul>
    );
  }
}
