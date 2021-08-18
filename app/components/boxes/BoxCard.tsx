import { ReactElement } from 'react';
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
import { useState } from 'react';

const BoxCard = (props: any): ReactElement => {
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
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BoxCard;
