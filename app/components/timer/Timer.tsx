import { ReactElement, useEffect, useState } from 'react';
import { Box as MUIBox, Typography } from '@mui/material';
import TimerClass from '@/classes/Timer';
import { useData } from '@/hooks/useData';

const Timer = (): ReactElement => {
  const {
    scramble,
    createTime,
    box,
    setTimerActive,
    currentPuzzle,
    generateNewScramble,
    scrambleLocked,
  } = useData();
  const [time, setTime] = useState(0);
  const [readying, setReadying] = useState(false);
  const [ready, setReady] = useState(false);

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
        await createTime({
          time: time,
          puzzle: currentPuzzle,
          scramble: scramble?.scramble_string ?? '',
        });
        generateNewScramble();
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

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  }, [box, currentPuzzle, scramble, scrambleLocked]);

  return (
    <MUIBox>
      <Typography
        color={readying ? '#D17777' : ready ? '#79D177' : 'textPrimary'}
        sx={{
          fontSize: { xs: '8em', xl: '16em' },
          fontFamily: 'Digit',
        }}
      >
        {(time / 1000).toFixed(2)}
      </Typography>
    </MUIBox>
  );
};

export default Timer;
