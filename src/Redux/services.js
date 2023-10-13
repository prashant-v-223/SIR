import axios from "axios";
const headersList = (Token) => {
  return {
    Accept: "*/*",
    Authorization: `Bearer ${Token}`,
    "Content-Type": "application/json",
  };
};
export const POST = async (api, data, token) => {
  return await axios.post(api, data, { headers: headersList(token) });
};
export const GET = async (api, data, token) => {
  return await axios.get(api, { headers: headersList(token) });
};
export const PUT = async (api, data) => {
  return await axios.put(api, data, { headers: headersList() });
};
export const PATCH = async (api, data) => {
  const res = await axios.patch(api, data, { headers: headersList() });
  return res;
};
