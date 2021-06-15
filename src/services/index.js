import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3100/` : '/'

const service = axios.create({ 
  withCredentials: true, 
  baseURL 
});

export const obtainDemo=(escenario, series, edos)=>
  service.get(`/demoResumen/${escenario}/${series}/${edos}`)
