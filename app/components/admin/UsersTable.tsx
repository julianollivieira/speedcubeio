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
  Card,
  LinearProgress,
} from '@mui/material';
import { Clear as ClearIcon, Check as CheckIcon } from '@mui/icons-material';
import useSWR from 'swr';
import ProfilePicture from '@/components/general/ProfilePicture';
import { FullUser } from '@/types/User';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UsersTable = (): ReactElement => {
  const { data, error } = useSWR('/api/admin/getUsers', fetcher);
  const isLoading = !data && !error;

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 300 }}>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pro</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Boxes</TableCell>
              <TableCell>Times</TableCell>
              <TableCell>Last login date</TableCell>
              <TableCell>Registration date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ p: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.users.map((user: FullUser) => (
                  <TableRow
                    key={user.uid}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell scope="row" sx={{ width: 300 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: 300,
                        }}
                      >
                        <ProfilePicture
                          src={user.profilePicture}
                          sx={{ height: 1, borderRadius: '50%' }}
                        />
                        <Typography variant="body2" sx={{ ml: 1.5 }} noWrap>
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
                      {false ? (
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
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      {dayjs(user.lastSignInTime).utc().fromNow()}
                    </TableCell>
                    <TableCell>
                      {dayjs(user.joinDate).utc().fromNow()}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UsersTable;
