export default function validate(values) {
  let errors = {};
  if (!values.vin) {
    errors.vin = 'Vin is Required';
  } else if (values.vin.length > 17) {
    errors.vin = 'Vin should not have more than 17 characters'
  }
  if (values.year) {
    if ((!/^\d*$/.test(values.year) || values.year.length > 4)) {
      errors.year = 'Make sure that you include a valid year'
    }
  }
  return errors;
};
