import { ReactElement, useState } from 'react';
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
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';

interface Props {
  id?: string;
  box: any;
  openDeleteDialog?: any;
  openEditDialog?: any;
  openShareDialog?: any;
  noActions?: boolean;
}

const BoxCard = (props: Props): ReactElement => {
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const handleShowMenu = () => setShowMenuButtons(true);
  const handleHideMenu = () => setShowMenuButtons(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <CardActionArea>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CardHeader
            sx={{ '& .MuiCardHeader-content': { width: 'calc(100% - 50px)' } }}
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
        </Box>
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
                  <TableCell>00.00</TableCell>
                  <TableCell>00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AO5</TableCell>
                  <TableCell>00.00</TableCell>
                  <TableCell>00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AO12</TableCell>
                  <TableCell>00.00</TableCell>
                  <TableCell>00.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        {props.noActions ?? (
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 50,
              p: 2,
            }}
          >
            {/* <Typography variant="caption" color="text.secondary">
            Created on {props.box.creationTime}
            Created an hour ago
          </Typography> */}
            <Typography variant="caption" color="text.secondary">
              <Box component="span" sx={{ fontSize: '1.6em' }}>
                126
              </Box>
              /500
            </Typography>
            {/* <Box sx={{ display: showMenuButtons ? 'flex' : 'none' }}>
            <IconButton onClick={() => props.openShareDialog(props.id)}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={() => props.openEditDialog(props.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => props.openDeleteDialog(props.id)}>
              <DeleteIcon />
            </IconButton>
          </Box> */}
          </CardActions>
        )}
      </CardActionArea>
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
            props.openEditDialog(props.id);
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
            props.openDeleteDialog(props.id);
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
            props.openShareDialog(props.id);
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
