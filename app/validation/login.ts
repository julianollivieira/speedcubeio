import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('Email address is required')
    .email('Enter a valid email address'),
  password: yup.string().required('Password is required'),
});
