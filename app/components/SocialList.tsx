import { Typography, Box, Button } from '@mui/material';
import { useProfile } from '@/hooks/data/useProfile';
import { useUser } from '@/hooks/data/useUser';
import { SocialLinkId } from '@/types';

const SocialList = () => {
  const { user } = useUser();
  const { profile, addSocialLink, editSocialLink, removeSocialLink } = useProfile();

  const handleClick = () => {
    addSocialLink('twitter', 'twitter.com/asiimo');
  };

  const handleDelete = (id: SocialLinkId) => {
    removeSocialLink(id);
  };

  const handleEdit = (id: SocialLinkId) => {
    editSocialLink(id, 'google.com');
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography>Social links for: {user?.displayName}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create socialLink
        </Button>
        <ul style={{ width: 500 }}>
          <li>Social links</li>
          {profile?.socialLinks ? profile?.socialLinks.map((socialLink) => (
            <li
              key={socialLink.id}
              style={{ border: '1px solid white', paddingTop: 10, paddingBottom: 10 }}
              onClick={() => handleEdit(socialLink.id)}
              onContextMenu={() => handleDelete(socialLink.id)}
            >
              {socialLink.href} ({socialLink.id})
            </li>
          )) : ''}
        </ul>
      </Box>
    </>
  );
};

export default SocialList;
