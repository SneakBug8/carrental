// in posts.js
import * as React from "react";
import
{
  List, Datagrid, Edit, Create, SimpleForm, TextField,
  EditButton, TextInput, TopToolbar, FilterButton, CreateButton, ExportButton, usePermissions,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import BookIcon from "@material-ui/icons/Book";
import { CarModel } from "../entities/CarModel";
import { Location } from "../entities/Location";

export const PostIcon = BookIcon;

export const AdminLimitedActions = ({ ...props }: any) =>
{
  const { loading, permissions } = usePermissions();
  return (
    <TopToolbar>
      <CreateButton disabled={permissions !== "admin"} />
      <ExportButton />
    </TopToolbar>
  );
};

export const ManagerLimitedActions = ({ ...props }: any) =>
{
  const { loading, permissions } = usePermissions();

  return (
    <TopToolbar>
      <CreateButton disabled={!["admin", "manager"].includes(permissions)} />
      <ExportButton />
    </TopToolbar>
  );
};


export const LocationsList = ({ permissions, ...props }: any) => (
  <List {...props} actions={<AdminLimitedActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      { permissions === "admin" && <EditButton basePath="/locations" />}
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