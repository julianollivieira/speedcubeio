import { Box } from '@/types';
import { useState } from 'react';
import { UnixEpochToDaysAgo, getBoxLastUseOrCreationTime } from '@/utils/helpers';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActionArea,
  IconButton,
  Box as MUIBox,
  CardActions,
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
  Close as CloseIcon,
} from '@mui/icons-material';
import BoxCardSummaryTable from '@/components/boxes/card/BoxCardSummaryTable';
import Link from 'next/link';

interface Props {
  box: Box;
  showControls: boolean;
  openDeleteBoxDialog: () => void;
  openEditBoxDialog: () => void;
  share: () => void;
}

const BoxCard = ({
  box,
  showControls,
  openDeleteBoxDialog,
  openEditBoxDialog,
  share
}: Props) => {
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const handleShowMenu = () => setShowMenuButtons(true);
  const handleHideMenu = () => setShowMenuButtons(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <Link href={`/boxes/${box.id}`}>
        <CardActionArea>
          <MUIBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CardHeader
              title={box.name}
              titleTypographyProps={{ noWrap: true }}
              subheader={`Last used ${UnixEpochToDaysAgo(
                getBoxLastUseOrCreationTime(box)
              )}`}
              avatar={
                <Avatar sx={{ bgcolor: box.color }} variant="rounded">
                  {box.icon}
                </Avatar>
              }
            />
            <IconButton
              size="large"
              sx={{
                mr: 2,
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
        {showControls ? (
          [
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
          ]
        ) : (
          <></>
        )}
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
