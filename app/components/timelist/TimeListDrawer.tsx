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
import TimeList from '@/classes/TimeList';
import { useEffect, useState } from 'react';
import TimeListRow from '@/components/timelist/TimeListRow';
import { Time, Box as BoxType } from '@/types';
import EditTimeDialog from '@/components/timer/dialogs/EditTimeDialog';
import BoxSelector from '@/components/misc/BoxSelector';
import PuzzleSelector from '@/components/misc/PuzzleSelector';
import { useAtom } from 'jotai';
import { currentPuzzleAtom, currentBoxIdAtom, boxesAtom, userAtom } from '@/store';
import deleteTime from '@/services/times/deleteTime';
import DeleteDialog from '../dialogs/DeleteDialog';
import { deleteTimeFromBoxArray } from '@/utils/state';

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

  const [currentBoxId] = useAtom(currentBoxIdAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [currentPuzzle, setCurrentPuzzle] = useAtom(currentPuzzleAtom);
  const [user] = useAtom(userAtom);

  const [timeList, setTimeList] = useState<TimeList>();
  const [rowOpen, setRowOpen] = useState<number | null>(null);
  const [deletingTime, setDeletingTime] = useState<Time | null>(null);
  const [editingTime, setEditingTime] = useState<Time | null>(null);
  const [box, setBox] = useState<BoxType | null>(null);

  useEffect(() => {
    if (!currentBoxId || !boxes) return;

    const box = boxes.find((b) => b.id === currentBoxId);
    if (!box) return;
    setBox(box);

    const newTimeList = new TimeList(box);
    setTimeList(newTimeList);
  }, [currentBoxId, boxes]);

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
                  height: 120,
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
                  showBoxSelector ? (showPuzzleSelector ? 284 : 164) : 64
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
                <PuzzleSelector
                  currentPuzzle={currentPuzzle}
                  onChange={(puzzle) => {
                    setCurrentPuzzle(puzzle);
                  }}
                />
              </Box>
            )}
          </Box>
          {showControls && (
            <>
              {deletingTime && user && currentBoxId && (
                <DeleteDialog
                  open={!!deletingTime}
                  title="Delete time"
                  content="Are you sure you want to delete this time?"
                  successMessage="Time deleted succesfully"
                  handleClose={() => setDeletingTime(null)}
                  handleDelete={async () => {
                    await deleteTime(user, currentBoxId, deletingTime.id);
                    setBoxes(
                      deleteTimeFromBoxArray(boxes, currentBoxId, deletingTime.id)
                    );
                  }}
                />
              )}
              {editingTime && (
                <EditTimeDialog
                  time={editingTime}
                  handleClose={() => setEditingTime(null)}
                />
              )}
            </>
          )}
        </>
      </Drawer>
    </>
  );
};

export default TimeListDrawer;
