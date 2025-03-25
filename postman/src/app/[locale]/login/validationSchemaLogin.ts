import * as Yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),

  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, including: 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
    )
    .required('Password is required.'),
});
