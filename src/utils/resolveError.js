export default function (errorMessages, failedValidator) {

  if (!failedValidator || !errorMessages) {
    return null;
  }

  if (typeof errorMessages === 'object') {
    return errorMessages[failedValidator];
  }

  if (typeof  errorMessages === 'string') {
    return errorMessages;
  }

}