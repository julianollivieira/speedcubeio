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
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
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

  return (
    <Card onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <CardActionArea>
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
      </CardActionArea>
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
        </Typography> */}
          <Typography variant="caption" color="text.secondary">
            <Box component="span" sx={{ fontSize: '1.5em' }}>
              126
            </Box>
            /500
          </Typography>
          <Box sx={{ display: showMenuButtons ? 'flex' : 'none' }}>
            <IconButton onClick={() => props.openShareDialog(props.id)}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={() => props.openEditDialog(props.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => props.openDeleteDialog(props.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default BoxCard;
