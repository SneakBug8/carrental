// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DateInput, DateField, ReferenceField, ReferenceInput, SelectInput } from "react-admin";
import RichTextInput from "ra-input-rich-text";
import BookIcon from "@material-ui/icons/Book";
import { CarModel } from "../entities/CarModel";
import { Car } from "../entities/Car";

export const PostIcon = BookIcon;

export const CarOrdersList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="Car" source="carId" reference="cars">
                <TextField source="id" />
            </ReferenceField>
          <DateField source="from" />
          <DateField source="to" />
            <EditButton basePath="/orders" />
        </Datagrid>
    </List>
);

const CarOrdersTitle = ({ record }: { record: CarModel} | any) => {
    return <span>Car Order {record ? `"${record.id}"` : ""}</span>;
};

export const CarOrdersEdit = (props: any) => (
    <Edit title={<CarOrdersTitle/>} {...props}>
        <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="Car" source="carId" reference="cars">
        <SelectInput optionText="id" />
      </ReferenceInput>
          <DateInput source="from" />
          <DateInput source="to" />
        </SimpleForm>
    </Edit>
);


export const CarOrdersCreate = (props: any) => (
    <Create title="Create an order" {...props}>
    <SimpleForm>
        <ReferenceInput label="Car" source="carId" reference="cars">
        <SelectInput optionText="id" />
        </ReferenceInput>
          <DateInput source="from" />
          <DateInput source="to" />
        </SimpleForm>
    </Create>
);
