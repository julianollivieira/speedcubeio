import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { Profile, Post, Poll, Puzzle, Box } from '@/types';
import { Scramble } from 'scrambow';

const userAtom = atom<User | undefined | null>(undefined);
const profileAtom = atom<Profile | undefined>(undefined);

const postsAtom = atom<Post[]>([]);
const pollsAtom = atom<Poll[]>([]);

const currentPuzzleAtom = atom<Puzzle | undefined>(undefined);

const scrambleAtom = atom<Scramble | undefined>(undefined);
const scrambleLockedAtom = atom<boolean>(false);
const scrambleHistoryAtom = atom<{ scramble: Scramble; puzzle: Puzzle }[]>([]);

const boxesAtom = atom<Box[]>([]);
const currentBoxIdAtom = atom<string | undefined>(undefined);
const timerActiveAtom = atom<boolean>(false);

export {
  userAtom,
  profileAtom,
  postsAtom,
  pollsAtom,
  currentPuzzleAtom,
  scrambleAtom,
  scrambleLockedAtom,
  scrambleHistoryAtom,
  boxesAtom,
  currentBoxIdAtom,
  timerActiveAtom,
};
