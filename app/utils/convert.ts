import Box from '@/types/Box';
import Time from '@/types/Time';

export const convertTimeObjectToTimeArray = (timeObject: any): Array<Time> => {
  let timeArray: Array<Time> = [];
  for (const property in timeObject) {
    timeArray.push({
      id: property,
      time: timeObject[property].time,
      puzzle: timeObject[property].puzzle,
      comment: timeObject[property].comment,
      creationTime: timeObject[property].creationTime,
    });
  }
  return timeArray;
};

export const convertBoxObjectToBoxArray = (boxObject: any): Array<Box> => {
  let boxArray: Array<Box> = [];
  for (const property in boxObject) {
    boxArray.push({
      id: property,
      name: boxObject[property].name,
      icon: boxObject[property].icon,
      color: boxObject[property].color,
      creationTime: boxObject[property].creationTime,
      times: boxObject[property].times,
    });
  }
  return boxArray;
};
