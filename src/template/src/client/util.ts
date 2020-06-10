export const isEqual = (...objects: any) =>
  objects.every(
    (obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0])
  );
