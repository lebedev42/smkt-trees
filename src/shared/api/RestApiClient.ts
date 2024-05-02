import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

const parsed = queryString.parse(location.search);

if (parsed?.gameToken) {
  const gameToken = Array.isArray(parsed.gameToken)
    ? parsed.gameToken[0]
    : parsed.gameToken;

  if (gameToken) {
    localStorage.setItem('token', gameToken);
  }
}

const token = localStorage.getItem('token') || null;

class RestApiClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer {${token}}` : '',
      },
    });
  }
}

export default RestApiClient;
