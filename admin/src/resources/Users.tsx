// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DateInput, DateField, ReferenceField, ReferenceInput, SelectInput, PasswordInput, Toolbar, SaveButton, DeleteButton } from "react-admin";
import RichTextInput from "ra-input-rich-text";
import BookIcon from "@material-ui/icons/Book";
import { CarModel } from "../entities/CarModel";
import { Car } from "../entities/Car";
import { AdminLimitedActions } from "./Locations";

export const PostIcon = BookIcon;

export const UsersList = (props: any) => (
  <List {...props} actions={<AdminLimitedActions/>}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="login" />
      <TextField source="name" />
      <TextField source="role" />
      <TextField source="phoneNumber" />
      <TextField source="email" />
      <EditButton basePath="/users" />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }: { record: CarModel } | any) =>
{
  return <span>Car Order {record ? `"${record.id}"` : ""}</span>;
};

const CustomToolbar = ({ permissions, ...props }: any) => (
  <Toolbar {...props} >
    {permissions === "admin" && <SaveButton />}
    {permissions === "admin" && <DeleteButton />}
  </Toolbar>
);

export const UsersEdit = (props: any) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm toolbar={<CustomToolbar {...props} />}>
      <TextInput disabled source="id" />
      <TextInput source="login" />
      <PasswordInput source="password" />
      <TextInput source="name" />
      <TextInput source="role" />
      <TextInput source="phoneNumber" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = (props: any) => (
  <Create title="Create a User" {...props}>
    <SimpleForm>
      <TextInput source="login" />
      <PasswordInput source="password" />
      <TextInput source="name" />
      <TextInput source="role" />
      <TextInput source="phoneNumber" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);
