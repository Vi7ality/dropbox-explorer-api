export const notifyDeleteMessage = (type: string) => {
  let message;
  switch (type) {
    case 'file':
      message = `Do you want to delete this file?`;
      break;

    case 'folder':
      message = `Do you want to delete this folder and whole file in it?`;
      break;
    default:
      break;
  }
  return message;
};
