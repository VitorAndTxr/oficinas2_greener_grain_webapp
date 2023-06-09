let date = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year
let hours = new Date().getHours(); //Current Hours
let min = new Date().getMinutes(); //Current Minutes
let sec = new Date().getSeconds(); //Current Seconds

// get current datetime
//OUTPUT: 20/9/2022 12:23:27
export const getCurrentDateTime = () => {
  return date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
};
