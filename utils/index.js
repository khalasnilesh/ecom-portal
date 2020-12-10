const axios = require("axios");

export const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}`,
});


export const AxiosServer = axios.create({
  baseURL: `${process.env.BACKEND_API}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": `${process.env.VERCEL_URL}`,
    "Access-Control-Allow-Methods": [
      "POST",
      "GET",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
});

// Split a single Array of object into a 2 dimensional array with 5 elements in each array
const splitGridData = (data) => {
  const len = data.length;
  const finalArr = [];
  const temp = [];
  let count = 1;
  for (let i = 0; i < len; i++) {
    if (count === 5 || i === len - 1) {
      temp.push(data[i]);
      count = 1;
      finalArr.push([...temp]);
      temp.splice(0, temp.length);
    } else {
      temp.push(data[i]);
      count++;
    }
  }
  return finalArr;
};
