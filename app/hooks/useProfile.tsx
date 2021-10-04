import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getFirestore, doc, updateDoc, getDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Profile, SocialLink, SocialLinkId } from '@/types';
import { useUser } from '@/hooks/useUser';

type Context = {
  profile: Profile | undefined | null;
  addSocialLink: (id: SocialLinkId, href: string) => void;
  editSocialLink: (id: SocialLinkId, href: string) => void;
  removeSocialLink: (id: SocialLinkId) => void;
};

const db = getFirestore(app);

const ProfileContext = createContext<Context>({
  profile: undefined,
  addSocialLink: undefined,
  editSocialLink: undefined,
  removeSocialLink: undefined,
}); // TODO: fix

const useProfile = (): Context => useContext(ProfileContext);

const ProfileProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [profile, setProfile] = useState<Profile>();
  const { user } = useUser();

  // Set profile on user load
  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'users', user.uid)).then((profileSnapshot) => {
        setProfile(profileSnapshot.data() as Profile);
      });
    }
  }, [user]);

  // Add a social link
  const addSocialLink = async (id: SocialLinkId, href: string): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileDocument = await getDoc(profileReference);
    const profileData = profileDocument.data() ?? { socialLinks: [] };

    profileData.socialLinks.push({
      id: id,
      href: href,
    });

    await updateDoc(profileReference, profileData);
    setProfile(profileData as Profile);
  };

  // Edit a social link
  const editSocialLink = async (id: SocialLinkId, href: string): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileDocument = await getDoc(profileReference);
    const profileData = profileDocument.data();

    if (!profileData) return;
    profileData.socialLinks = profileData.socialLinks.map((socialLink: SocialLink) => {
      if (socialLink.id === id) {
        return {
          ...socialLink,
          href: href,
        };
      } else {
        return socialLink;
      }
    });

    await updateDoc(profileReference, profileData);
    setProfile(profileData as Profile);
  };

  // Remove a social link
  const removeSocialLink = async (id: SocialLinkId): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileDocument = await getDoc(profileReference);
    const profileData = profileDocument.data();

    if (!profileData) return;
    profileData.socialLinks = profileData.socialLinks.filter(
      (socialLink: SocialLink) => socialLink.id !== id
    );

    await updateDoc(profileReference, profileData);
    setProfile(profileData as Profile);
  };

  const value: Context = { profile, addSocialLink, editSocialLink, removeSocialLink };
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export { ProfileProvider, useProfile };
