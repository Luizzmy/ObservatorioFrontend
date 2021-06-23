import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3100/` : '/'

const service = axios.create({
  withCredentials: true,
  baseURL
});

export const obtainDemo = (escenario, series, edos, sum) =>
  service.get(`/demoResumen/${escenario}/${series}/${edos}/${sum}`)

export const obtainDemoTotal = (escenario, series, sum) =>
  service.get(`/demoResumen/${escenario}/${series}/${sum}`)

export const obtainResumenAct = () =>
  service.get(`/resumenAct`)

export const obtainResumenEdo = () =>
  service.get(`/resumenEdo`)
