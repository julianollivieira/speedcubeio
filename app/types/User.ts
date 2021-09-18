import Box from '@/types/Box';
import { Social } from '@/utils/socials';

export interface UserData {
  id: string;
  bio: string;
  socials: {
    discord: string;
    facebook: string;
    instagram: string;
    reddit: string;
    twitch: string;
    twitter: string;
    youtube: string;
  };
  boxes: Box[];
}

export interface FullUser {
  uid: string;
  email: string | null | undefined;
  displayName: string | null | undefined;
  joinDate: string | undefined;
  lastSignInTime: string | undefined;
  bio: string | undefined;
  socials: Social[];
  profilePicture: string | undefined;
}
