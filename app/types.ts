export interface Provider {
  providerId: string;
  uid: string;
  displayName: string;
  emaiL: string;
  phoneNumber: string;
  photoURL: string;
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  providerData: Provider[];
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface SocialLink {
  id: string;
  href: string;
}

export interface Profile {
  socialLinks: SocialLink[];
  isPrivate: boolean;
  isVerified: boolean;
}

export type Puzzle =
  | '2x2x2'
  | '3x3x3'
  | '4x4x4'
  | '5x5x5'
  | '6x6x6'
  | '7x7x7'
  | 'pyraminx'
  | 'megaminx'
  | 'square-1'
  | 'skewb'
  | 'clock';

export interface Time {
  id: string;
  timer: number;
  puzzle: Puzzle;
  scramble: string;
  comment?: string;
  createdAt: string;
}

export interface Box {
  id: string;
  name: string;
  icon: string;
  color: string;
  times: Time[];
  createdAt: string;
}

// export interface User {
//   uid: string;
//   displayName: string;
//   email: string;
//   emailVerified: boolean;
//   metadata: {
//     creationTime: string;
//     lastSignInTime: string;
//   };
//   photoURL: string;
// }

// export interface Profile {
//   socialLinks: SocialLink[];
//   isPrivate: boolean;
//   isVerified: boolean;
// }

// export interface SocialLink {
//   id: string;
//   href: string;
// }
