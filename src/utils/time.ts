export const convertDate = (time: string) => {
  if(!time) {
    return 'N/A'
  }
  const date = new Date(time);
  return  date.toLocaleDateString();
}