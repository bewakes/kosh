import React from 'react';
import { useForm } from 'react-hook-form';

import {
    Row, Col,
    Form as BForm, FormGroup,
    Label, Input as BInput, Button,
} from 'reactstrap';


interface FieldSpecs {
    label: string;
    type: "string" | "number" | "date" | "text";
    initialValue?: any;
    required?: boolean;
    hidden?: boolean;
}

export interface FormSpecs {
    fields: { [key: string]: FieldSpecs; };
    layout: string[][];
}

interface FormProps {
    specs: FormSpecs;
    onSubmit: (formData: any) => void;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
    const { specs, onSubmit } = props;
    const { register, handleSubmit, errors } = useForm();
    return (
        <BForm onSubmit={handleSubmit(onSubmit)}>
            {
                specs.layout.map((fields: string[], i: number) => (
                    <Row key={i}>
                        {
                            fields.map((field: string, j: number) => (
                                <Col key={j}>
                                    <FormGroup>
                                        <Label>
                                            {specs.fields[field].label}
                                            <small className="text-danger">
                                                {specs.fields[field].required ? " *" : null}
                                            </small>
                                        </Label>
                                        <small className="text-danger">
                                            {errors[field] && ( errors[field].message || "  Please check the value" )}
                                        </small>
                                        <BInput
                                            name={field}
                                            innerRef={register({ required: !!specs.fields[field].required })}
                                            invalid={!!errors[field]}
                                        />
                                    </FormGroup>
                                </Col>
                            ))
                        }
                    </Row>
                ))
            }
            <Button type="submit" color="primary">Submit</Button>
        </BForm>
    );
};

export default Form;
