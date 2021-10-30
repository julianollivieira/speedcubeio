import {
  Box,
  Drawer as MuiDrawer,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReactElement } from 'react';
import { useData } from '@/hooks/useData';
import TimeList from '@/classes/TimeList';
import { useEffect, useState } from 'react';
import TimeListRow from '@/components/timelist/TimeListRow';
import { Time } from '@/types';
import DeleteTimeDialog from '@/components/timer/dialogs/DeleteTimeDialog';
import BoxSelector from '@/components/misc/BoxSelector';

const drawerWidth = 360;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
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
})(({ theme, open }: { theme: any; open: any }) => ({
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
}

const TimeListDrawer = ({
  open,
  showControls = false,
  showBoxSelector = false,
}: Props): ReactElement => {
  const theme = useTheme();
  const { deleteTime, box } = useData();
  const [timeList, setTimeList] = useState<TimeList>();
  const [rowOpen, setRowOpen] = useState<number | null>(null);
  const [deletingTime, setDeletingTime] = useState<Time | null>(null);

  useEffect(() => {
    if (box) {
      const newTimeList = new TimeList(box);
      setTimeList(newTimeList);
    }
  }, [box]);

  const handleSetRowOpen = (index: number | null) => setRowOpen(index);

  return (
    <Drawer variant="permanent" open={open} theme={theme} anchor="right">
      <>
        <Box sx={{ marginTop: '64px' }}>
          {showBoxSelector && (
            <Box sx={{ p: 2, height: 100 }}>
              <BoxSelector />
            </Box>
          )}
          <TableContainer>
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
                        ao5={ao5}
                        ao12={ao12}
                        timeData={timeData}
                        index={index}
                        open={rowOpen}
                        setOpen={handleSetRowOpen}
                        showControls={showControls}
                        setDeletingTime={(time: Time | null) => setDeletingTime(time)}
                      />
                    );
                  })
                  .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
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
      </>
    </Drawer>
  );
};

export default TimeListDrawer;
