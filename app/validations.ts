import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Enter a valid email address'),
  password: yup.string().required('Password is required'),
});

export const signupValidationSchema = yup.object().shape({
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
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export const boxValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(32, 'Name should cannot be longer then 32 characters'),
  icon: yup
    .string()
    .required('Icon is required')
    .min(1, 'Icon should be at least 1 character')
    .max(2, 'Icon cannot be longer then 2 characters'),
  color: yup
    .string()
    .required('Color is required')
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Select a valid color'),
});

export const changePasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters'),
});
