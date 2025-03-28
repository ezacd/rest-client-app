import * as Yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('invalid_email_address')
    .required('email_is_required'),

  password: Yup.string()
    .matches(passwordRegex, 'password_must')
    .required('password_is_required'),

  confiumPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords_must_match')
    .required('confirm_password_is_required'),
});
