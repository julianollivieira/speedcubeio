import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { Profile } from '@/types';

export const userAtom = atom<User | undefined>(undefined);
export const profileAtom = atom<Profile | undefined>(undefined);
