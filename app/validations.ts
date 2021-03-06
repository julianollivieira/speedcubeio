import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Enter a valid email address'),
  password: yup.string().required('Password is required'),
});

export const signupValidationSchema = yup.object().shape({
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords need to be the same'),
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
});

export const boxValidationSchema = yup.object().shape({
  color: yup
    .string()
    .required('Color is required')
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Select a valid color'),
  icon: yup
    .string()
    .required('Icon is required')
    .min(1, 'Icon should be at least 1 character')
    .max(2, 'Icon cannot be longer than 2 characters'),
  name: yup
    .string()
    .required('Name is required')
    .max(32, 'Name should cannot be longer than 32 characters'),
});

export const timeValidationSchema = yup.object().shape({
  time: yup.number().required('Time is required'),
  scramble: yup.string().max(1024, 'Scramble cannot be longer than 1024 characters'),
  puzzle: yup.string().max(64, 'Puzzle cannot be longer than 64 characters'),
  comment: yup.string().max(1024, 'Comment cannot be longer than 1024 characters'),
});

export const changePasswordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters'),
});

export const requestPasswordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Enter a valid email address'),
});
