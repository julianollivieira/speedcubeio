interface AuthError {
  [key: string]: string;
}

const authErrors: AuthError = {
  'auth/wrong-password': 'Incorrect email and/or password',
  'auth/user-not-found': 'Incorrect email and/or password',
  'auth/email-not-verified': 'Please verify your email',
  'auth/email-already-in-use': 'Email already in use',
  'auth/too-many-requests': 'Please wait a moment before trying again',
  'auth/email-already-verified': 'Email already verified',
};

export default authErrors;
