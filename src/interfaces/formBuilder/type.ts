import { ReactNode } from 'react';
import {
    UseFormReturn,
    FieldValues,
    SubmitHandler,
    RegisterOptions
} from 'react-hook-form';

export interface FieldOption {
    label: string;
    value: string;
}

// Form field definition
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'number' | 'checkbox' | 'radio';
    placeholder?: string;
    validation?: any;  
    customProps?: Record<string, any>;
    options?: FieldOption[];
}

export interface FormClassNames {
    formContainer?: string;
    fieldContainer?: string;
    label?: string;
    input?: string;
    textarea?: string;
    select?: string;
    errorMessage?: string;
    formActions?: string;
}

// Main FormBuilder props
export interface FormBuilderProps<T extends FieldValues> {
    fields: FormField[];
    onSubmit: SubmitHandler<T>;
    submitButtonText?: string | ReactNode;
    formMethods: UseFormReturn<T>;
    onReset?: () => void;
    classNames?: FormClassNames;
    customButtons?: ReactNode; // Custom buttons to render instead of default ones
}