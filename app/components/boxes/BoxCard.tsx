import { ReactElement, useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  CardActions,
  Box as MUIBox,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/utils/auth';
import TimeList from '@/classes/TimeList';
import Box from '@/types/Box';
import Time from '@/types/Time';
import BoxSummaryTable from '@/components/boxes/BoxSummaryTable';
import { getBoxLastUseOrCreationTime } from '@/utils/convert';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import useBox from '@/hooks/useBox';

interface Props {
  box: Box;
  openDeleteDialog: (box: Box) => void;
  openEditDialog: (box: Box) => void;
  openShareDialog: (box: Box) => void;
  isPreview?: boolean;
}

const BoxCard = (props: Props): ReactElement => {
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const handleShowMenu = () => setShowMenuButtons(true);
  const handleHideMenu = () => setShowMenuButtons(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const { currentUser } = useAuth();
  const { box } = useBox(currentUser, props.box.id);

  const [timeList, setTimeList] = useState<TimeList | null>(null);
  useEffect(() => {
    // if (!box) return;
    if (!box?.times) return;
    const timeList: TimeList = new TimeList(box);
    setTimeList(timeList);
  }, [box]);

  return (
    <Card onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <Link href={`/boxes/${props.box.id}`}>
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
                '& .MuiCardHeader-content': { width: 'calc(100% - 50px)' },
              }}
              title={props.box.name}
              titleTypographyProps={{ noWrap: true }}
              subheader={`Last used ${dayjs(
                getBoxLastUseOrCreationTime(props.box)
              )
                .utc()
                .fromNow()}`}
              avatar={
                <Avatar sx={{ bgcolor: props.box.color }} variant="rounded">
                  {props.box.icon}
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
            <BoxSummaryTable timeList={timeList} />
          </CardContent>
          {!props.isPreview ? (
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: 50,
                p: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <MUIBox component="span" sx={{ fontSize: '1.6em' }}>
                  {timeList?.times.length}
                </MUIBox>
                /500
              </Typography>
            </CardActions>
          ) : (
            ''
          )}
        </CardActionArea>
      </Link>
      <Menu
        id="box-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            props.openEditDialog(props.box);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            props.openDeleteDialog(props.box);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            props.openShareDialog(props.box);
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
