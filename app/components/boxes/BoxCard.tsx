import { ReactElement, useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  CardActions,
  Box as MUIBox,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import Link from 'next/link';
import { useAuth } from '@/utils/auth';
import useTimes from '@/hooks/useTimes';
import TimeList from '@/classes/TimeList';
import { msToTime } from '@/utils/msToTime';
import Box from '@/types/Box';
import Time from '@/types/Time';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';

interface Props {
  box: Box;
  openDeleteDialog: (boxId: string) => void;
  openEditDialog: (boxId: string) => void;
  openShareDialog: (boxId: string) => void;
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
  const { times } = useTimes(currentUser, props.box.id);

  const [timeList, setTimeList] = useState<TimeList | null>(null);

  useEffect(() => {
    if (!times) return;
    const timesArray = times?.map((time: Time) => time.time);
    const timeList: TimeList = new TimeList(timesArray);
    setTimeList(timeList);
  }, [times]);

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
              subheader={`Last used yesterday`}
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
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Last</TableCell>
                    <TableCell>Best</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>
                      {msToTime(timeList?.getLastTime(), true)}
                    </TableCell>
                    <TableCell>
                      {msToTime(timeList?.getBestTime(), true)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AO5</TableCell>
                    <TableCell>
                      {msToTime(timeList?.getLastAverageOf5(), true)}
                    </TableCell>
                    <TableCell>
                      {msToTime(timeList?.getBestAverageOf5(), true)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AO12</TableCell>
                    <TableCell>
                      {msToTime(timeList?.getLastAverageOf12(), true)}
                    </TableCell>
                    <TableCell>
                      {msToTime(timeList?.getBestAverageOf12(), true)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
            props.openEditDialog(props.box.id);
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
            props.openDeleteDialog(props.box.id);
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
            props.openShareDialog(props.box.id);
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
