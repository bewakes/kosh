import React from 'react';
import { useForm } from 'react-hook-form';

import {
    Row, Col,
    Form as BForm, FormGroup,
    Label, Input as BInput, Button,
} from 'reactstrap';


interface BaseFieldSpecs {
    label: string;
    required?: boolean;
    hidden?: boolean;
    initialValue?: any;
}

type NonEmptyArray<T> = [T, ...T[]]

interface NormalFieldSpecs extends BaseFieldSpecs {
    type: "string" | "number" | "date" | "text";
}

interface SelectFieldSpecs extends BaseFieldSpecs {
    type: "select";
    options: NonEmptyArray<{ key: string; label: string; }>;
}

type FieldSpecs = NormalFieldSpecs | SelectFieldSpecs;

export interface FormSpecs {
    fields: { [key: string]: FieldSpecs; };
    layout: string[][];
    defaults?: { [key: string]: string | number | null | undefined; };
}

interface FormProps {
    specs: FormSpecs;
    onSubmit: (formData: any) => void;
}

const FormInput: React.FC<{ specs: FieldSpecs, name: string; register: any, errors: {[key: string]: any; }}>  = (props) => {
    const { specs: {type, label, required, options, hidden }, name, register, errors } = props;

    const labelElem = !hidden ? (
        <Label>
            {label}
            <small className="text-danger">
                {required ? " *" : null}
            </small>
        </Label>
    ) : null;

    const inputFrame = (labelItem: JSX.Element | null, inputItem: JSX.Element) => {
        return (
            <FormGroup>
                {labelItem}
                <small className="text-danger">
                    {errors[name] && ( errors[name].message || "  Please check the value" )}
                </small>
                {inputItem}
            </FormGroup>
        );
    };

    const getInput = (type: "text" | "date" | "number" | "textarea") => (
        <BInput type={type}
            name={name}
            innerRef={register({ required: !!required })}
            invalid={!!errors[name]}
        />
    );

    if (type === "string") {
        return inputFrame(labelElem, getInput("text"));
    } else if (type === "date") {
        return inputFrame(labelElem, getInput("date"));
    } else if (type === "number") {
        return inputFrame(labelElem, getInput("number"));
    } else if (type === "select") {
        const validation = {
            required: !!required,
        };
        const inputElem = (
            <BInput type="select" name={name} innerRef={register(validation)} invalid={!!errors[name]}>
                <>
                    <option value=""> -- Select option --</option>
                {
                    (options || []).map((option: any, i: number) => (
                        <option key={i} value={option.key}>
                            {option.label}
                        </option>
                    ))
                }
                    </>
            </BInput>
        );
        return inputFrame(labelElem, inputElem);
    } else if (type === "text") {
        return inputFrame(labelElem, getInput("textarea"));
    }
    return null;
};

const Form: React.FC<FormProps> = (props: FormProps) => {
    const { specs, onSubmit } = props;
    const { register, handleSubmit, errors } = useForm({
        defaultValues: specs.defaults
    });
    return (
        <BForm onSubmit={handleSubmit(onSubmit)}>
            {
                specs.layout.map((fields: string[], i: number) => (
                    <Row key={i}>
                        {
                            fields.map((field: string, j: number) => (
                                <Col key={j}>
                                    <FormInput
                                        name={field}
                                        register={register}
                                        specs={specs.fields[field]}
                                        errors={errors}
                                />
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
