import { Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from "react-admin"

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput
                    source="title"
                    validate={[required()]}
                    label="title"
                />
                <ReferenceInput
                    source="unitId"
                    reference="units"
                />
                <NumberInput
                    source="order"
                    validate={[required()]}
                    label="order"
                />
            </SimpleForm>
        </Edit>
    )
}