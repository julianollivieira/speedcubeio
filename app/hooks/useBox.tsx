import { useAtom } from 'jotai';
import { currentBoxIdAtom, boxesAtom } from '@/store';
import { Box } from '@/types';
import { useEffect, useState } from 'react';

const useBox = () => {
  const [currentBoxId] = useAtom(currentBoxIdAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    if (!currentBoxId) return;
    const newBox = boxes.find((b) => b.id === currentBoxId);
    if (!newBox) return;
    setBox(newBox);
  }, [boxes, currentBoxId]);

  useEffect(() => {
    if (!box) return;
    const newBoxes = boxes.map((b) => (b.id === currentBoxId ? box : b));
    setBoxes(newBoxes);
  }, [box]);

  return { box, setBox };
};

export default useBox;
