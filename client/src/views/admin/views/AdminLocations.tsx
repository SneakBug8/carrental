import React from "react";
import axios from "axios";
import { API } from "../../../API";
import { Location } from "../../../entities/Location";
import { ErrorMessage } from "../../../partials/ErrorMessage";
import { AdminLocationPartial } from "../partials/AdminLocation";
import { Requisite } from "../../../Requisite";

export class AdminLocations extends React.Component<{}, { locations: Location[], error: Requisite }>
{
  constructor(props: {})
  {
    super(props);
    this.state = {
      locations: new Array<Location>(),
      error: new Requisite(),
    };
  }

  componentDidMount() {
    API.GetLocations().then((response) =>
    {
      console.log(response.data);
      this.setState({
        locations: response.data as Location[],
      });
    })
      .catch((response) =>
      {
        this.setState({
          error: response,
        });
      });
  }

  render()
  {
    return (
      <div>
        <ErrorMessage requisite={this.state.error} />
        {!this.state.locations.length ? (<p>Нет доступных локаций.</p>) : ""}
        {this.state.locations.map((location) => (<AdminLocationPartial key={location.Name} location={location} />))}
      </div>
    );
  }
}
