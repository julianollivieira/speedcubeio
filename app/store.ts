import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { Profile, Post, Poll, Puzzle, Box } from '@/types';
import { Scramble } from 'scrambow';

export const userAtom = atom<User | undefined>(undefined);
export const profileAtom = atom<Profile | undefined>(undefined);

export const postsAtom = atom<Post[]>([]);
export const pollsAtom = atom<Poll[]>([]);

export const currentPuzzleAtom = atom<Puzzle | undefined>(undefined);

export const scrambleAtom = atom<Scramble | undefined>(undefined);
export const scrambleLockedAtom = atom<boolean>(false);
export const scrambleHistoryAtom = atom<{ scramble: Scramble; puzzle: Puzzle }[]>([]);

export const boxesAtom = atom<Box[]>([]);
export const currentBoxIdAtom = atom<string | undefined>(undefined);

export const timerActiveAtom = atom<boolean>(false);
