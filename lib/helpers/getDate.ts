export const getDate = () => {
  var newDate = new Date(Date.now());
  newDate.setHours(newDate.getHours() - 2);
  //console.log(newDate.getTime().toString());
  let date = Math.floor(newDate.getTime() / 1000);
  return date.toString();
};
