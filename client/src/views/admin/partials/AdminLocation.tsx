import React from "react";
import { Location } from "../../../entities/Location";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

export class AdminLocationPartial extends React.Component<{ location: Location }, {
  editMode: boolean,
  location: Location,
  hadChanges: boolean,
}>
{
  constructor(props: { location: Location })
  {
    super(props);
    this.state = {
      editMode: false,
      hadChanges: false,
      location: this.props.location,
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
    this.saveConfirmed = this.saveConfirmed.bind(this);
    this.deleteConfirmed = this.deleteConfirmed.bind(this);
    this.endEditing = this.endEditing.bind(this);
  }

  onEditClick()
  {
    this.setState({
      editMode: true,
      hadChanges: false,
    });
  }

  endEditing()
  {
    this.setState({
      editMode: false,
    });
  }

  saveConfirmed()
  {
    this.endEditing();
  }

  onSaveClick()
  {
    if (!this.state.hadChanges) {
      this.endEditing();
      return;
    }
    confirmAlert({
      title: "Confirm saving",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.saveConfirmed(),
        },
        {
          label: "No",
          onClick: () => this.endEditing(),
        }
      ]
    });
  }

  deleteConfirmed()
  {
    this.endEditing();
  }

  onDeleteClick()
  {
    confirmAlert({
      title: "Confirm deleting",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteConfirmed(),
        },
        {
          label: "No",
          onClick: () => this.endEditing(),
        }
      ]
    });
  }

  onNameInput(event: React.ChangeEvent<HTMLInputElement>)
  {
    let loc = this.state.location;
    loc.Name = event.target.value;
    this.setState({
      location: loc,
      hadChanges: true,
    });
  }

  render()
  {
    if (!this.state.editMode) {
      return (
        <div className="location card">
          <h2>{this.props.location.Name}</h2>
          <a className="btn btn-primary" onClick={this.onEditClick}>Edit</a>
        </div>
      );
    }

    return (
      <div className="location card">
        <label htmlFor="location-name">Name:</label>
        <input name="location-name" type="text" placeholder="Name location" value={this.state.location.Name}
          required autoFocus onChange={this.onNameInput} />
        <a className="btn btn-success" onClick={this.onSaveClick}>Save</a>
        <a className="btn btn-danger" onClick={this.onDeleteClick}>Delete</a>
      </div>
    );
  }
}