'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { settingsFormConfig } from "@/config/formsConfig/settingsFormConfig";
import classes from './UserSettingsPage.module.scss';

type UserSettingsFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    currentPassword: string;
    newPassword?: string;
    confirmNewPassword?: string;
    bio?: string;
};

const UserSettingsPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateMessage, setUpdateMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const formMethods = useForm<UserSettingsFormValues>({
        mode: 'onBlur',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            bio: ''
        }
    });

    // const { watch } = formMethods;
    // const newPassword = watch('newPassword');

    const onSubmit = async (data: UserSettingsFormValues) => {
        setIsSubmitting(true);
        setUpdateMessage(null);

        try {
            // TODO: Replace with actual API call to update user settings
            console.log('Updating user settings:', data);
            
            // Simulate API call
            // TODO: Change this later
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setUpdateMessage({
                type: 'success',
                message: 'Settings updated successfully!'
            });
            
            // Clear password fields after successful update
            formMethods.setValue('currentPassword', '');
            formMethods.setValue('newPassword', '');
            formMethods.setValue('confirmNewPassword', '');
            
        } catch (error) {
            console.error('Error updating settings:', error);
            setUpdateMessage({
                type: 'error',
                message: 'Failed to update settings. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const customButtons = (
        <div className={classes.buttonGroup}>
            <button 
                type="submit"
                className={classes.updateButton}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Updating...' : 'Update Settings'}
            </button>
            <button 
                type="button"
                className={classes.cancelButton}
                onClick={() => formMethods.reset()}
                disabled={isSubmitting}
            >
                Reset
            </button>
        </div>
    );

    return (
        <section className={classes.settingsContainer}>
            {updateMessage && (
                <div 
                    className={updateMessage.type === 'success' ? classes.successMessage : classes.errorMessage}
                    role="alert"
                >
                    {updateMessage.message}
                </div>
            )}
            
            <FormBuilder
                fields={settingsFormConfig}
                formMethods={formMethods}
                onSubmit={onSubmit}
                customButtons={customButtons}
                classNames={{
                    formContainer: classes.formContainer,
                    fieldContainer: classes.fieldContainer,
                    label: classes.label,
                    input: classes.input,
                    textarea: classes.textarea,
                    errorMessage: classes.errorMessage
                }}
            />
        </section>
    );
};

export default UserSettingsPage;