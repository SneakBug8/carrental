// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from "react-admin";
import RichTextInput from "ra-input-rich-text";
import BookIcon from "@material-ui/icons/Book";
import { CarModel } from "../entities/CarModel";
import { Location } from "../entities/Location";

export const PostIcon = BookIcon;

export const LocationsList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton basePath="/locations" />
    </Datagrid>
  </List>
);

const LocationTitle = ({ record }: { record: Location } | any) =>
{
  return <span>Location {record ? `"${record.id}"` : ""}</span>;
};

export const LocationEdit = (props: any) => (
  <Edit title={<LocationTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const LocationCreate = (props: any) => (
  <Create title="Create a Location" {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);