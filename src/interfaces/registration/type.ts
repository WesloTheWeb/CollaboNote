type ApiError = string | string[];

export interface RegistrationApiResponse {
    success: boolean;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: string;
    };
    message?: string;
    errors?: Record<string, ApiError>;
};

export type RegistrationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
};
