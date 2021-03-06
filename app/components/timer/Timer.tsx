import { ReactElement, useEffect, useRef, useState } from 'react';
import { Box as MUIBox, Typography } from '@mui/material';
import TimerClass from '@/classes/Timer';
import { useAtom } from 'jotai';
import {
  userAtom,
  scrambleAtom,
  scrambleLockedAtom,
  currentPuzzleAtom,
  timerActiveAtom,
  currentBoxIdAtom,
  boxesAtom,
} from '@/store';
import generateNewScramble from '@/utils/generateNewScramble';
import createTime from '@/services/times/createTime';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

const Timer = (): ReactElement => {
  const [user] = useAtom(userAtom);
  const [scramble, setScramble] = useAtom(scrambleAtom);
  const [currentBoxId] = useAtom(currentBoxIdAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [scrambleLocked] = useAtom(scrambleLockedAtom);
  const [currentPuzzle] = useAtom(currentPuzzleAtom);
  const [, setTimerActive] = useAtom(timerActiveAtom);

  const [time, setTime] = useState(0);
  const [readying, setReadying] = useState(false);
  const [ready, setReady] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = new TimerClass({
      onTick: (time: number) => {
        setTime(time);
      },
      onReadying: () => {
        setReadying(true);
        setTimerActive(true);
      },
      onCancelReady: () => {
        setReadying(false);
        setTimerActive(false);
      },
      onReady: () => {
        setReady(true);
        setReadying(false);
      },
      onStart: () => {
        setReady(false);
        setReadying(false);
      },
      onStop: async (time: number) => {
        setTimerActive(false);
        if (!user || !currentPuzzle || !currentBoxId || !scramble?.scramble_string)
          return;

        createTime(user, currentBoxId, {
          time: time,
          puzzle: currentPuzzle,
          scramble: scramble?.scramble_string,
        })
          .then((newTime) => {
            if (!newTime) return;
            const currentBox = boxes.find((b) => b.id === currentBoxId);
            if (!currentBox) return;
            if (!currentBox?.times) {
              currentBox.times = [];
            }
            currentBox.times.push(newTime);
            const newBoxes = boxes.map((b) => (b.id === currentBoxId ? currentBox : b));
            setBoxes(newBoxes);
          })
          .catch(() => {
            createSnackbar(
              enqueueSnackbar,
              closeSnackbar,
              "Something wen't wrong while saving your time",
              'error'
            );
          });

        const newScramble = generateNewScramble(scrambleLocked, currentPuzzle);
        if (!newScramble) {
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            "Something wen't wrong while generating a new scramble",
            'error'
          );
          return;
        }
        setScramble(newScramble);
        if (!currentPuzzle) {
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            "Something wen't wrong while generating a new scramble",
            'error'
          );
          return;
        }
      },
    });

    const keyDown = (event: KeyboardEvent) => {
      if (event.code == 'Space') {
        if (!timer.isReadying) {
          if (!timer.isRunning) {
            timer.startReadying();
          } else {
            timer.stop();
            setReadying(true);
          }
        }
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      if (event.code == 'Space') {
        if (timer.justStopped) {
          timer.justStopped = false;
          setReadying(false);
        } else {
          if (!timer.isReady) {
            timer.cancelReadying();
          } else {
            timer.start();
          }
        }
      }
    };

    const touchStart = () => {
      if (!timer.isReadying) {
        if (!timer.isRunning) {
          timer.startReadying();
        } else {
          timer.stop();
          setReadying(true);
        }
      }
    };

    const touchEnd = () => {
      if (timer.justStopped) {
        timer.justStopped = false;
        setReadying(false);
      } else {
        if (!timer.isReady) {
          timer.cancelReadying();
        } else {
          timer.start();
        }
      }
    };

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    boxRef.current?.addEventListener('touchstart', touchStart);
    boxRef.current?.addEventListener('touchend', touchEnd);

    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);

      boxRef.current?.removeEventListener('touchstart', touchStart);
      boxRef.current?.removeEventListener('touchend', touchEnd);
    };
  }, [currentBoxId, currentPuzzle, scramble, scrambleLocked]);

  return (
    <MUIBox
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      ref={boxRef}
    >
      <MUIBox>
        <Typography
          color={readying ? '#D17777' : ready ? '#79D177' : 'textPrimary'}
          sx={{
            fontSize: { xs: '8em', xl: '16em' },
            fontFamily: 'Digit',
            userSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {(time / 1000).toFixed(2)}
        </Typography>
      </MUIBox>
    </MUIBox>
  );
};

export default Timer;
