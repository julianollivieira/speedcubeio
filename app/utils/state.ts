import { Box } from '@/types';

const deleteBoxFromBoxArray = (boxes: Box[], boxId: string): Box[] => {
  return boxes.filter((box) => box.id !== boxId);
};

const deleteTimeFromBoxArray = (boxes: Box[], boxId: string, timeId: string): Box[] => {
  return boxes.map((box) => {
    if (box.id === boxId) {
      box.times = box.times.filter((t) => t.id !== timeId);
    }
    return box;
  });
};

export { deleteBoxFromBoxArray, deleteTimeFromBoxArray };
