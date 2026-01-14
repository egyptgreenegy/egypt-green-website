import { baseApi, SuccessResponse } from "../app/baseApi";

// Contact form data interface
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
}

// Contact form validation schema
export const validateContactForm = (data: ContactFormData): { isValid: boolean; errors: Partial<ContactFormData> } => {
    const errors: Partial<ContactFormData> = {};
    
    // Required fields validation
    if (!data.name || data.name.trim().length === 0) {
        errors.name = "Name is required";
    }
    
    if (!data.email || data.email.trim().length === 0) {
        errors.email = "Email is required";
    } else {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }
    }
    
    // Phone validation (optional but must be valid if provided)
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        submitContactForm: builder.mutation<SuccessResponse<any>, ContactFormData>({
            query: (contactData) => ({
                url: 'contact',
                method: 'POST',
                body: contactData
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const { useSubmitContactFormMutation } = contactApi;
