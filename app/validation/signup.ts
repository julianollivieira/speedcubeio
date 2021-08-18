import * as yup from 'yup';

export default yup.object().shape({
  displayName: yup
    .string()
    .required('Display name is required')
    .min(8, 'Display name should be at least 8 characters'),
  email: yup
    .string()
    .required('Email address is required')
    .email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords need to be the same'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});
