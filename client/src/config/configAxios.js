import axios from "axios";

const apiUrl = "https://class-of-our-own-server.onrender.com";

function configAxios(config) {
  const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    ...config,
  });

  instance.interceptors.request.use(
    (c) => {
      const token = `Bearer ${getCookie("access_token")}`;
      c.baseURL = apiUrl;
      if (token) {
        c.headers.authorization = token;
      }
      return c;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    function (response) {
      if (response.data) {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        return Promise.reject(response);
      }
      return Promise.reject(response);
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default { configAxios, apiUrl };
