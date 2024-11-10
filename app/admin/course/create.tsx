import { Create, required, SimpleForm, TextInput } from "react-admin"

export const CourseCreate = () => {
    return (
        <Create>
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
        </Create>
    )
}