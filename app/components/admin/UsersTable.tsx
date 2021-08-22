import { ReactElement } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
} from '@material-ui/core';
import { Clear as ClearIcon, Check as CheckIcon } from '@material-ui/icons';
import useSWR from 'swr';
import ProfilePicture from '@/components/general/ProfilePicture';
import firebase from '@/utils/firebase';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UsersTable = (): ReactElement => {
  const { data, error } = useSWR('/api/admin/getUsers', fetcher);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 300 }}>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Email verified</TableCell>
            <TableCell>Pro</TableCell>
            <TableCell>Last login date</TableCell>
            <TableCell>Registration date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users.map((user: firebase.User) => (
            <TableRow
              key={user.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row" sx={{ width: 300 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
                  <ProfilePicture sx={{ height: 1, borderRadius: '50%' }} />
                  <Typography variant="body2" sx={{ ml: 1 }} noWrap>
                    {user.displayName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell scope="row" sx={{ width: 300 }}>
                <Typography variant="body2" noWrap>
                  {user.email}
                </Typography>
              </TableCell>
              <TableCell scope="row">
                {user.emailVerified ? (
                  <CheckIcon color="success" />
                ) : (
                  <ClearIcon color="error" />
                )}
              </TableCell>
              <TableCell scope="row">
                {false ? (
                  <CheckIcon color="success" />
                ) : (
                  <ClearIcon color="error" />
                )}
              </TableCell>
              <TableCell>{user.metadata.lastSignInTime}</TableCell>
              <TableCell>{user.metadata.creationTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
