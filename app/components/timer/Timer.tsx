import { useEffect, useState } from 'react';
import { Box as MUIBox, Typography } from '@mui/material';
import TimerClass from '@/classes/Timer';
import { useAuth } from '@/hooks/useAuth';
import { createTime } from '@/utils/data/times';
import { Box } from '@/types';

interface Props {
  box: Box | undefined;
}

const Timer = ({ box }: Props) => {
  const [time, setTime] = useState(0);
  const [readying, setReadying] = useState(false);
  const [ready, setReady] = useState(false);

  const { user, addTime: addTimeToState } = useAuth();

  useEffect(() => {
    const timer = new TimerClass();

    timer.init({
      onTick: (time: any) => {
        setTime(time);
      },
      onReadying: () => {
        setReadying(true);
      },
      onCancelReady: () => {
        setReadying(false);
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
        if (user && box?.id) {
          const timeObject = await createTime(
            user?.id,
            box?.id,
            time,
            '3x3x3',
            'U R L F B F B'
          );
          addTimeToState(box?.id, timeObject);
        }
      },
    });

    const keyDown = (event: any) => {
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

    const keyUp = (event: any) => {
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
  }, [box]);

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
