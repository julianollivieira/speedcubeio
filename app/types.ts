export interface Provider {
  providerId: string;
  uid: string;
  displayName: string;
  emaiL: string;
  phoneNumber: string;
  photoURL: string;
}

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

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  publishedOn: number;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  active: boolean;
  publishedOn: number;
}
