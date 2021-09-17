import { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TimerClass from '@/classes/Timer';
import { useAuth } from '@/utils/auth';
import useTimes from '@/hooks/useTimes';

interface Props {
  boxId: string;
}

const Timer = (props: Props): ReactElement => {
  const { boxId } = props;
  const [time, setTime] = useState<number>(0);
  const [readying, setReadying] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { createTime } = useTimes(currentUser);

  useEffect(() => {
    let timer = new TimerClass();

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
      onStop: (time: number) => {
        createTime(boxId, time, '3b3b3', 'comment');
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
      // Clean up event listeners
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  }, [boxId]);

  return (
    <Typography
      variant="h1"
      sx={{
        fontFamily: 'Digit',
        fontSize: { xs: '8em', lg: '16em' },
        color: readying ? '#D17777' : ready ? '#79D177' : '',
      }}
    >
      {(time / 1000).toFixed(2)}
    </Typography>
  );
};

export default Timer;
