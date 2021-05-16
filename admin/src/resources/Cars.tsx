// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, ReferenceField, ReferenceInput, SelectInput } from "react-admin";
import BookIcon from "@material-ui/icons/Book";
import { Car } from "../entities/Car";

export const PostIcon = BookIcon;

export const CarsList = (props : any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="Model" source="modelId" reference="models">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Location" source="locationId" reference="locations">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="color" />
            <EditButton basePath="/cars" />
        </Datagrid>
    </List>
);

const CarTitle = ({ record }: { record: Car} | any) => {
    return <span>Car {record ? `"${record.id}"` : ""}</span>;
};

export const CarEdit = (props: any) => (
    <Edit title={<CarTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput label="Model" source="modelId" reference="models">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="color" />
        </SimpleForm>
    </Edit>
);

export const CarCreate = (props: any) => (
    <Create title="Create a Car" {...props}>
        <SimpleForm>
            <ReferenceInput label="Model" source="modelId" reference="models">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="color" />
        </SimpleForm>
    </Create>
);