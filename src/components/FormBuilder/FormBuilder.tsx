'use client';

import { UseFormRegister, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ButtonTypes, FormBuilderProps, FormField } from '@/interfaces';
import classes from './FormBuilderCore.module.scss';
import Button from '../Button/Button';

const FormBuilder = <T extends FieldValues>({
    fields,
    onSubmit,
    formMethods,
    onReset,
    classNames = {},
    customButtons, // Custom button elements
}: FormBuilderProps<T>) => {
    const { register, handleSubmit } = formMethods;
    const { errors, isSubmitting } = formMethods.formState;

    // Merge default classes with custom classNames
    const {
        formContainer = classes.formContainer,
        fieldContainer = classes.fieldContainer,
        label = classes.label,
        input = classes.input,
        textarea = classes.textarea,
        select = classes.select,
        errorMessage = classes.errorMessage,
        formActions = classes.formActions
    } = classNames;

    const renderField = (field: FormField, register: UseFormRegister<T>) => {
        const { name, type, placeholder, validation = {}, customProps = {}, options = [] } = field;
        const fieldName = name as Path<T>;

        const registration = register(fieldName, validation as any);

        const commonProps = {
            ...registration,
            placeholder,
            ...customProps,
            'aria-invalid': errors[fieldName] ? 'true' : 'false',
            id: name
        };

        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        className={textarea}
                    />
                );
            case 'select':
                return (
                    <select
                        {...(commonProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
                        className={select}
                    >
                        {options?.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                );
            case 'checkbox':
            case 'radio':
                return (
                    <div className={classes.checkboxContainer}>
                        <input
                            type={type}
                            {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
                        />
                    </div>
                );
            default:
                return (
                    <input
                        type={type}
                        {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
                        className={input}
                    />
                );
        }
    };

    return (
        <div className={formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {fields.map((field) => {
                    const { name, label: labelText } = field;
                    const fieldName = name as Path<T>;
                    const error = errors[fieldName];

                    return (
                        <div key={name} className={fieldContainer}>
                            <label htmlFor={name} className={label}>
                                {field.validation?.required && <span className="required">*</span>}
                                {labelText}
                            </label>

                            {renderField(field, register)}

                            {error && (
                                <span className={errorMessage}>
                                    {error.message as string}
                                </span>
                            )}
                        </div>
                    );
                })}
                <section className={formActions}>
                    {customButtons ? (
                        customButtons
                    ) : (
                        <>
                            <Button
                                type='submit'
                                fn={() => { }}
                                buttonType={ButtonTypes.SUBMIT}
                            />
                            {onReset && (
                                <Button
                                    type='button'
                                    fn={onReset}
                                    buttonType={ButtonTypes.RESET}
                                />
                            )}
                        </>
                    )}
                </section>
            </form>
        </div>
    );
};

export default FormBuilder;