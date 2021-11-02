import {
  Box,
  Drawer as MuiDrawer,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Backdrop,
  useMediaQuery,
  Theme,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { useData } from '@/hooks/useData';
import TimeList from '@/classes/TimeList';
import { useEffect, useState } from 'react';
import TimeListRow from '@/components/timelist/TimeListRow';
import { Time } from '@/types';
import DeleteTimeDialog from '@/components/timer/dialogs/DeleteTimeDialog';
import EditTimeDialog from '@/components/timer/dialogs/EditTimeDialog';

import BoxSelector from '@/components/misc/BoxSelector';
import PuzzleSelector from '@/components/misc/PuzzleSelector';

const drawerWidth = 360;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0px`,
  [theme.breakpoints.up('lg')]: {
    width: drawerWidth,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: { theme: Theme; open: any }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  open: boolean;
  showControls?: boolean;
  showBoxSelector?: boolean;
  showPuzzleSelector?: boolean;
  closeDrawer: () => void;
}

const TimeListDrawer = ({
  open,
  showControls = false,
  showBoxSelector = false,
  showPuzzleSelector = false,
  closeDrawer,
}: Props): ReactElement => {
  const theme = useTheme();
  const { deleteTime, box } = useData();
  const [timeList, setTimeList] = useState<TimeList>();
  const [rowOpen, setRowOpen] = useState<number | null>(null);
  const [deletingTime, setDeletingTime] = useState<Time | null>(null);
  const [editingTime, setEditingTime] = useState<Time | null>(null);

  useEffect(() => {
    if (box) {
      const newTimeList = new TimeList(box);
      setTimeList(newTimeList);
    }
  }, [box]);

  const handleSetRowOpen = (index: number | null) => setRowOpen(index);

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {matches && (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: 1 }} onClick={closeDrawer} />
      )}
      <Drawer variant="permanent" open={open} theme={theme} anchor="right">
        <>
          <Box sx={{ marginTop: '64px' }}>
            {showBoxSelector && (
              <Box
                sx={{
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  height: 100,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: '#151C24',
                }}
              >
                <BoxSelector />
              </Box>
            )}
            <TableContainer
              sx={{
                height: `calc(100vh - ${
                  showBoxSelector ? (showPuzzleSelector ? 264 : 164) : 64
                }px)`,
                overflowY: 'auto',
              }}
            >
              <Table stickyHeader sx={{ maxWidth: '360px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>AO5</TableCell>
                    <TableCell>AO12</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeList?.times
                    .map((_: number, index: number) => {
                      const ao5 = timeList.ao5s[index];
                      const ao12 = timeList.ao12s[index];
                      const timeData = box?.times ? box?.times[index] : undefined;
                      return (
                        <TimeListRow
                          key={index}
                          ao5={ao5}
                          ao12={ao12}
                          timeData={timeData}
                          index={index}
                          open={rowOpen}
                          setOpen={handleSetRowOpen}
                          showControls={showControls}
                          setDeletingTime={(time: Time | null) => setDeletingTime(time)}
                          setEditingTime={(time: Time | null) => setEditingTime(time)}
                        />
                      );
                    })
                    .reverse()}
                </TableBody>
              </Table>
            </TableContainer>
            {showPuzzleSelector && (
              <Box
                sx={{
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  height: 100,
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: '#151C24',
                }}
              >
                <PuzzleSelector />
              </Box>
            )}
          </Box>
          {showControls && deletingTime ? (
            <DeleteTimeDialog
              time={deletingTime}
              handleClose={() => setDeletingTime(null)}
              deleteTime={async (): Promise<void> => {
                await deleteTime(deletingTime.id);
                setRowOpen(null);
              }}
            />
          ) : (
            ''
          )}
          {showControls && editingTime ? (
            <EditTimeDialog
              time={editingTime}
              handleClose={() => setEditingTime(null)}
              editTime={async (): Promise<void> => {
                // await editTime(editingTime.id);
                // setRowOpen(null);
              }}
            />
          ) : (
            ''
          )}
        </>
      </Drawer>
    </>
  );
};

export default TimeListDrawer;
