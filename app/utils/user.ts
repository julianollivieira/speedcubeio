import { FullUser, UserData } from '@/types/User';
import admin from '@/utils/firebase/admin';
import { User } from 'firebase/auth';
import socials, { Social } from '@/utils/socials';
import app from '@/utils/firebase/client';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

export const convertUserToFullUser = async (
  user: User | null | undefined,
  data: UserData
): Promise<FullUser | null> => {
  if (!user) return null;

  const profilePictureRef = ref(storage, `users/${user.uid}/profile.png`);
  const profilePictureURL: string = await getDownloadURL(profilePictureRef);

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    joinDate: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    bio: data?.bio,
    socials: data?.socials ? getSocialObjects(data.socials) : [],
    profilePicture: profilePictureURL,
  };
};

export const convertUserRecordToFullUser = async (
  userRecord: admin.auth.UserRecord | null | undefined,
  data: any
): Promise<FullUser | null> => {
  if (!userRecord) return null;

  const profilePictureRef = ref(storage, `users/${userRecord.uid}/profile.png`);
  const profilePictureURL: string = await getDownloadURL(profilePictureRef);

  return {
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    joinDate: userRecord.metadata.creationTime,
    lastSignInTime: userRecord.metadata.lastSignInTime,
    bio: data?.bio,
    socials: data?.socials ? getSocialObjects(data.socials) : [],
    profilePicture: profilePictureURL,
  };
};

export const getSocialObjects = (socialsData: any): Social[] => {
  let socialArray: Social[] = [];
  for (const [key, value] of Object.entries(socialsData)) {
    const foundSocialObject: Social | undefined = socials.find(
      (socialObject) => socialObject.id == key
    );
    if (foundSocialObject) {
      foundSocialObject.href = <string>value;
      socialArray.push(foundSocialObject);
    }
  }
  return socialArray;
};
