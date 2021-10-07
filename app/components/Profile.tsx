import { Typography, Box, Button } from '@mui/material';
import { useData } from '@/hooks/useData';
import { SocialLinkId } from '@/types';

const Profile = () => {
  const {
    user,
    profile,
    addSocialLink,
    editSocialLink,
    removeSocialLink,
    setProfileVisibility,
    changeProfilePicture,
    removeProfilePicture,
  } = useData();

  const handleClick = () => {
    addSocialLink('twitter', 'twitter.com/asiimo');
  };

  const handleDelete = (id: SocialLinkId) => {
    removeSocialLink(id);
  };

  const handleEdit = (id: SocialLinkId) => {
    editSocialLink(id, 'google.com');
  };

  const toggleVisiblity = async () => {
    await setProfileVisibility(profile?.isPrivate ? 'public' : 'private');
  };

  const handleChangeProfilePicture = async (e) => {
    await changeProfilePicture(e.target.files[0]);
  };

  const handleRemoveProfilePicture = async () => {
    await removeProfilePicture();
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography>Social links for: {user?.displayName}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create socialLink
        </Button>
        <Button onClick={toggleVisiblity} variant="outlined" sx={{ ml: 2 }}>
          Toggle profile visibility
        </Button>
        <ul style={{ width: 500 }}>
          <li>Profile</li>
          <li>private: {profile?.isPrivate ? 'yes' : 'no'}</li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            Profile image:
            <img
              src={user?.photoURL ?? ''}
              style={{ height: 50, width: 50, marginLeft: 20 }}
            />
          </li>
          <li style={{ paddingTop: 10, paddingBottom: 10 }}>
            <input type="file" onChange={handleChangeProfilePicture} />
            <Button
              onClick={handleRemoveProfilePicture}
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          </li>
          <li>Social links</li>
          {profile?.socialLinks
            ? profile?.socialLinks.map((socialLink) => (
              <li
                key={socialLink.id}
                style={{
                  border: '1px solid white',
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onContextMenu={() => handleEdit(socialLink.id)}
              >
                {socialLink.href} ({socialLink.id})
                <Button variant="contained" onClick={() => handleDelete(socialLink.id)}>
                  X
                </Button>
              </li>
            ))
            : ''}
        </ul>
      </Box>
    </>
  );
};

export default Profile;
