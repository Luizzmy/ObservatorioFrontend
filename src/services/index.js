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

export const obtainResumenAct = (escenario) =>
  service.get(`/resumenAct/${escenario}`)

export const obtainResumenActEdos = (escenario, edos) =>
  service.get(`/resumenAct/${escenario}/${edos}`)

export const obtainResumenEdo = (escenario) =>
  service.get(`/resumenEdo/${escenario}`)

export const obtainResumenEdoEdos = (escenario, edos) =>
  service.get(`/resumenEdo/${escenario}/${edos}`)
