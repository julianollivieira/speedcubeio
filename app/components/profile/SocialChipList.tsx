import SocialChip from '@/components/profile/SocialChip';
import socials from '@/utils/socials';
import { SocialLink } from '@/types';

interface Props {
  socialLinks: SocialLink[] | undefined;
}

const SocialChipList = ({ socialLinks }: Props) => {
  return (
    <>
      {(socialLinks ?? []).map((socialLink) => {
        const social = socials.find((social) => social.id === socialLink.id);
        if (!social) return null;
        return (
          <SocialChip
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
