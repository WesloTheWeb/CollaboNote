'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { settingsFormConfig } from "@/config/formsConfig/settingsFormConfig";
import { UserSettingsFormValues, UserSettingsPageProps } from '@/interfaces';
import classes from './UserSettingsPage.module.scss';

const {
    settingsContainer,
    formContainer,
    fieldContainer,
    label,
    input,
    textarea,
    errorMessage,
    fieldErrorMessage,
    buttonGroup,
    updateButton,
    cancelButton,
    successMessage
} = classes;

const UserSettingsPage = ({ initialUserSettings }: UserSettingsPageProps) => {
    const queryClient = useQueryClient();
    const { update: updateSession } = useSession();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const formMethods = useForm<UserSettingsFormValues>({
        mode: 'onBlur',
        defaultValues: {
            firstName: initialUserSettings.firstName,
            lastName: initialUserSettings.lastName,
            email: initialUserSettings.email,
            bio: initialUserSettings.bio || ''
        }
    });

    const updateUserMutation = useMutation({
        mutationFn: async (data: UserSettingsFormValues) => {
            const response = await fetch('/api/user-settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    bio: data.bio
                }),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to update settings');
            }

            return result.userSettings;
        },
        onSuccess: async (updatedUserSettings) => {
            // Update the form with the new data
            formMethods.reset({
                firstName: updatedUserSettings.firstName,
                lastName: updatedUserSettings.lastName,
                email: updatedUserSettings.email,
                bio: updatedUserSettings.bio || ''
            });

            // Show success message
            setShowSuccessMessage(true);

            // Trigger NextAuth to refetch user data from database
            await updateSession();

            // Invalidate queries that might depend on user settings
            queryClient.invalidateQueries({ queryKey: ['userSettings'] });

            // Invalidate session to update the user name across the app
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
        onError: (error) => {
            console.error('Error updating settings:', error);
        }
    });

    // Clear success message after 3 seconds
    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    const onSubmit = (data: UserSettingsFormValues) => {
        updateUserMutation.mutate(data);
    };

    const handleReset = () => {
        formMethods.reset({
            firstName: initialUserSettings.firstName,
            lastName: initialUserSettings.lastName,
            email: initialUserSettings.email,
            bio: initialUserSettings.bio || ''
        });
    };

    const customButtons = (
        <div className={buttonGroup}>
            <button
                type="submit"
                className={updateButton}
                disabled={updateUserMutation.isPending}
            >
                {updateUserMutation.isPending ? 'Updating...' : 'Update Settings'}
            </button>
            <button
                type="button"
                className={cancelButton}
                onClick={handleReset}
                disabled={updateUserMutation.isPending}
            >
                Reset
            </button>
        </div>
    );

    return (
        <section className={settingsContainer}>
            {showSuccessMessage && (
                <div className={successMessage} role="alert">
                    Settings updated successfully!
                </div>
            )}
            {updateUserMutation.error && (
                <div className={errorMessage} role="alert">
                    {updateUserMutation.error.message}
                </div>
            )}
            <FormBuilder
                fields={settingsFormConfig}
                formMethods={formMethods}
                onSubmit={onSubmit}
                customButtons={customButtons}
                classNames={{
                    formContainer: formContainer,
                    fieldContainer: fieldContainer,
                    label: label,
                    input: input,
                    textarea: textarea,
                    errorMessage: fieldErrorMessage
                }}
            />
        </section>
    );
};

export default UserSettingsPage;