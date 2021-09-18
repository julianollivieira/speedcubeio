import { FullUser, UserData } from '@/types/User';
import admin from '@/utils/firebase/admin';
import { User } from 'firebase/auth';
import socials, { Social } from '@/utils/socials';

export const convertUserToFullUser = (
  user: User | null | undefined,
  data: UserData
): FullUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    displayName: user.displayName,
    joinDate: user.metadata.creationTime,
    bio: data?.bio,
    socials: data?.socials ? getSocialObjects(data.socials) : [],
  };
};

export const convertUserRecordToFullUser = (
  userRecord: admin.auth.UserRecord | null | undefined,
  data: any
): FullUser | null => {
  if (!userRecord) return null;
  return {
    uid: userRecord.uid,
    displayName: userRecord.displayName,
    joinDate: userRecord.metadata.creationTime,
    bio: data?.bio,
    socials: data?.socials ? getSocialObjects(data.socials) : [],
  };
};

const getSocialObjects = (socialsData: any): Social[] => {
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
