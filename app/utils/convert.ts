import Box from '@/types/Box';

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
