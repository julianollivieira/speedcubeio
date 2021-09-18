const convertAuthCodeToMessage = (firebaseAuthErrorCode: string): string => {
  switch (firebaseAuthErrorCode) {
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/user-not-found':
      return 'Incorrect email/password';
    case 'auth/wrong-password':
      return 'Incorrect email/password';
    default:
      return "Something wen't wrong, please try again";
  }
};

export default convertAuthCodeToMessage;
