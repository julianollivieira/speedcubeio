import Box from '@/types/Box';

export default interface UserData {
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
