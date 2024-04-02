const strongPasswordRegex = /^.{8,}$/;
const emailRegex =
  /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const confirmPassMessage = 'New Password & Confirm Password must match';

const Validation = {
  mobileNumber: {
    required: 'Enter Your Mobile Number',
    maxLength: {value: 10, message: 'Enter Correct Mobile Number'},
    minLength: {value: 10, message: 'Enter Correct Mobile Number'},
  },
  password: {
    required: 'Enter Password',
    pattern: {
      value: strongPasswordRegex,
      message: 'Must be at least 8 character',
    },
  },
  confirmPassMessage,
  Name: {
    required: 'Enter Your Name',
  },
  email: {
    required: 'Enter Email Address',
    pattern: {
      value: emailRegex,
      message: 'Enter Correct Email Address',
    },
  },
};
export default Validation;
