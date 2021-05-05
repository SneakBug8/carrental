import React from "react";
import { CarModel } from "../../../entities/CarModel";
import { Requisite } from "../../../Requisite";
import { State } from "../../../State";
import { ErrorMessage } from "../../../partials/ErrorMessage";
import Select from "react-select";
import { Location } from "../../../entities/Location";

interface ILocationSelectorProps
{
  callback: (value: string) => void;
};

interface ILocationSelectorState
{
  locations: Location[];
  names: any[];
  error: Requisite;
}

export class LocationSelector extends React.Component<ILocationSelectorProps, ILocationSelectorState>
{
  constructor(props: ILocationSelectorProps)
  {
    super(props);
    this.state = {
      locations: new Array(),
      names: new Array(),
      error: new Requisite(),
    };
  }

  componentDidMount()
  {
    State.GetLocations().then((response) =>
    {
      console.log(response.data);
      console.log((response.data || new Array<CarModel>()).map((el) => el.Name));
      this.setState({
        locations: response.data || new Array(),
        names: (response.data || new Array<Location>()).map((el) =>
          ({
            label: el.Name,
            value: el.Name,
          })),
      });
    })
      .catch((response) =>
      {
        this.setState({
          error: response,
        });
      });
  }

  handleChange = (newValue: {label: string, value: string}) =>
  {
    this.props.callback(newValue.value);
    return newValue;
  }

  render()
  {
    return (
      <div>
        <ErrorMessage requisite={this.state.error} />
        <label htmlFor="locations">Выберите локацию:</label>
        <Select
          className="locations-select"
          id="locations"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isSearchable={true}
          name="locations"
          options={this.state.names}
          onChange = {this.handleChange}
        />
      </div>
    );
  }
}
