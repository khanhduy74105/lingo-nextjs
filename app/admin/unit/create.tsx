import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin"

export const UnitCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="title"
                />
                <TextInput
                    source="description"
                    validate={[required()]}
                    aria-required label="description"
                />
                <ReferenceInput
                    source="courseId"
                    reference="courses"
                />
                <NumberInput 
                    source="order"
                    validate={[required()]}
                    label="order"
                />
            </SimpleForm>
        </Create>
    )
}