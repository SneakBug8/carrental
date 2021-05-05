import React from "react";
import { CarModel } from "../../../entities/CarModel";
import { Requisite } from "../../../Requisite";
import { State } from "../../../State";
import { ErrorMessage } from "../../../partials/ErrorMessage";
import Select, { GroupTypeBase } from "react-select";

interface IModelSelectorProps
{
  callback: (value: string) => void;
};

interface IModelSelectorState
{
  models: CarModel[];
  names: any[];
  error: Requisite;
}

export class ModelSelector extends React.Component<IModelSelectorProps, IModelSelectorState>
{
  constructor(props: IModelSelectorProps)
  {
    super(props);
    this.state = {
      models: new Array<CarModel>(),
      names: new Array(),
      error: new Requisite(),
    };
  }

  componentWillMount()
  {
    State.GetModels().then((response) =>
    {
      console.log(response.data);
      console.log((response.data || new Array<CarModel>()).map((el) => el.Name));
      this.setState({
        models: response.data || new Array<CarModel>(),
        names: (response.data || new Array<CarModel>()).map((el) =>
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
        <label htmlFor="models">Выберите модель:</label>
        <Select
          className="models-select"
          id="models"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isSearchable={true}
          name="models"
          options={this.state.names}
          onChange = {this.handleChange}
        />
      </div>
    );
  }
}
