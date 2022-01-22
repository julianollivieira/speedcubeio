import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { Profile, Post, Poll } from '@/types';

export const userAtom = atom<User | undefined>(undefined);
export const profileAtom = atom<Profile | undefined>(undefined);
export const postAtom = atom<Post[]>([]);
export const pollAtom = atom<Poll[]>([]);
