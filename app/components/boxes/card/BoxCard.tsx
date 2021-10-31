import { Box } from '@/types';
import { ReactElement, useState } from 'react';
import { UnixEpochToDaysAgo, getBoxLastUseOrCreationTime } from '@/utils/helpers';
import { User } from 'firebase/auth';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActionArea,
  IconButton,
  Box as MUIBox,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import BoxCardSummaryTable from '@/components/boxes/card/BoxCardSummaryTable';
import Link from 'next/link';

interface Props {
  user: User | null | undefined;
  box: Box;
  showControls: boolean;
  openDeleteBoxDialog: () => void;
  openEditBoxDialog: () => void;
  share: () => void;
}

const BoxCard = ({
  user,
  box,
  showControls,
  openDeleteBoxDialog,
  openEditBoxDialog,
  share,
}: Props): ReactElement => {
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const handleShowMenu = () => setShowMenuButtons(true);
  const handleHideMenu = () => setShowMenuButtons(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <Link
        href={`${!showControls && user ? `/users/${user?.uid}` : ''}/boxes/${box.id}`}
      >
        <CardActionArea>
          <MUIBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CardHeader
              sx={{
                flex: 1,
                pr: 0,
                width: 'calc(100% - 72px)',
                '& .MuiCardHeader-content': { overflow: 'hidden' },
              }}
              title={box.name}
              subheader={`Last used ${UnixEpochToDaysAgo(
                getBoxLastUseOrCreationTime(box)
              )}`}
              titleTypographyProps={{
                sx: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
              subheaderTypographyProps={{
                sx: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
              avatar={
                <Avatar sx={{ bgcolor: box.color }} variant="rounded">
                  {box.icon}
                </Avatar>
              }
            />
            <MUIBox
              sx={{
                width: '72px',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                size="large"
                sx={{
                  display: { xs: 'flex', lg: showMenuButtons ? 'flex' : 'none' },
                }}
                onTouchStart={(event) => {
                  event.stopPropagation();
                }}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleMenuOpen(event);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </MUIBox>
          </MUIBox>
          <CardContent>
            <BoxCardSummaryTable box={box} />
          </CardContent>
          {/* <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 50,
              pt: 0,
              pr: 2,
              pb: 2,
              pl: 4,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              <MUIBox component="span" sx={{ fontSize: '2em' }}>
                {box.times?.length ?? 0}
              </MUIBox>
              /500
            </Typography>
          </CardActions> */}
        </CardActionArea>
      </Link>
      <Menu
        id="box-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {showControls && [
          <MenuItem
            key="edit"
            onClick={() => {
              handleMenuClose();
              openEditBoxDialog();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>,
          <MenuItem
            key="delete"
            onClick={() => {
              handleMenuClose();
              openDeleteBoxDialog();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>,
        ]}
        <MenuItem
          key="share"
          onClick={() => {
            handleMenuClose();
            share();
            // copyBoxLinkToClipboard();
          }}
        >
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default BoxCard;
