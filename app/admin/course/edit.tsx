import { Edit, required, SimpleForm, TextInput } from "react-admin"

export const CourseEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="title"
                />
                <TextInput
                    source="imageSrc"
                    validate={[required()]}
                    aria-required label="imageSrc"
                />
            </SimpleForm>
        </Edit>
    )
}