export const settingsFormConfig = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text' as const,
        validation: {
            required: 'First name is required',
            minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
            }
        }
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text' as const,
        validation: {
            required: 'Last name is required',
            minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
            }
        }
    },
    {
        name: 'email',
        label: 'Email (cannot be changed)',
        type: 'email' as const,
        customProps: {
            disabled: true,
            style: { backgroundColor: '#f5f5f5', cursor: 'not-allowed' }
        },
        validation: {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
    },
    {
        name: 'bio',
        label: 'Bio',
        type: 'textarea' as const,
        validation: {
            maxLength: {
                value: 500,
                message: 'Bio cannot exceed 500 characters'
            }
        }
    }
];