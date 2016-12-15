import useValidator from './useValidator';

export default function (required, validators, value, disabled) {

  if (disabled){
    return null;
  }

  if (required) {
    const valid = (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== false
    );

    if (valid && validators) {
      return useValidator(validators, value)
    } else {
      return valid ? null : 'required';
    }
  }

  if (validators) {
    return useValidator(validators, value)
  }

}