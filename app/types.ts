export interface Provider {
  providerId: string;
  uid: string;
  displayName: string;
  emaiL: string;
  phoneNumber: string;
  photoURL: string;
}

// export interface User {
//   uid: string;
//   email: string;
//   emailVerified: boolean;
//   displayName: string;
//   isAnonymous: boolean;
//   providerData: Provider[];
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//   };
//   createdAt: string;
//   lastLoginAt: string;
//   apiKey: string;
//   appName: string;
// }

export interface SocialLink {
  id: SocialLinkId;
  href: string;
}

export interface Profile {
  socialLinks: SocialLink[];
  isPrivate: boolean;
  isVerified: boolean;
}

export type SocialLinkId =
  | 'youtube'
  | 'twitter'
  | 'facebook'
  | 'reddit'
  | 'discord'
  | 'twitch'
  | 'instagram';

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
  time: number;
  puzzle: Puzzle;
  scramble: string;
  comment?: string;
  createdAt: number;
}

export interface Box {
  id: string;
  name: string;
  icon: string;
  color: string;
  times: Time[];
  createdAt: number;
  isPrivate: boolean;
}
