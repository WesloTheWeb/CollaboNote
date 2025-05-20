export const loginRegisterConfig = [
    {
        name: 'email',
        label: 'Email',
        type: 'email' as const,
        validation: {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password' as const,
        validation: {
            required: 'Password is required'
        }
    }
];