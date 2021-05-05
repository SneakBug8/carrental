import React from "react";
import { AdminSidebar } from "./partials/AdminSidebar";
import { AdminNavbar } from "./partials/AdminNavbar";

export class Admin extends React.Component
{
    render()
    {
        return (
            <div className="container Admin">
                <AdminNavbar />
                <div className="mt-1 row">
                    <div className="col-sm-12 col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-sm-12 col-md-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
