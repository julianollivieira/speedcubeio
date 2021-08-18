import * as yup from 'yup';

export default yup.object().shape({
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
