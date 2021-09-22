export interface User {
  id: string;
  displayName: string;
  email: string;
  joinDate: string;
  lastSignInTime: string;
  profilePicture: string | undefined;
  boxes: Box[];
  socialLinks: SocialLink[];
  isPrivate: boolean;
  isVerified: boolean;
}

export interface Box {
  id: string;
  name: string;
  icon: string;
  color: string;
  creationTime: {
    seconds: number;
    nanoseconds: number;
  };
  times: Time[];
}

export interface Time {
  id: string;
  time: number;
  puzzle: string;
  scramble: string;
  comment?: string;
  creationTime: number; // seconds
}

export interface SocialLink {
  id: string;
  href: string;
}
