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
  displayName: string | null | undefined;
  joinDate: string | undefined;
  bio: string | undefined;
  socials: Social[];
}
