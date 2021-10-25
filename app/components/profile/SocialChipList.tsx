import SocialChip from '@/components/profile/SocialChip';
import socials from '@/utils/socials';
import { SocialLink } from '@/types';
import { ReactElement } from 'react';

interface Props {
  socialLinks: SocialLink[] | undefined;
}

const SocialChipList = ({ socialLinks }: Props): ReactElement => {
  return (
    <>
      {(socialLinks ?? []).map((socialLink) => {
        const social = socials.find((social) => social.id === socialLink.id);
        if (!social) return null;
        return (
          <SocialChip
            key={social.name}
            name={social.name}
            color={social.color}
            icon={social.icon}
            viewBox={social.viewBox}
            padding={social.padding}
            href={socialLink.href}
          />
        );
      })}
    </>
  );
};

export default SocialChipList;
