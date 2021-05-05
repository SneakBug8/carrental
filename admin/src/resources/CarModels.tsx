// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from "react-admin";
import RichTextInput from "ra-input-rich-text";
import BookIcon from "@material-ui/icons/Book";
import { CarModel } from "../entities/CarModel";

export const PostIcon = BookIcon;

export const CarModelsList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/models" />
        </Datagrid>
    </List>
);

const CarModelTitle = ({ record }: { record: CarModel} | any) => {
    return <span>Car Model {record ? `"${record.id}"` : ""}</span>;
};

export const CarModelEdit = (props: any) => (
    <Edit title={<CarModelTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="photo" />
            <RichTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const CarModelCreate = (props: any) => (
    <Create title="Create a Model" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="photo" />
            <RichTextInput source="description" />
        </SimpleForm>
    </Create>
);