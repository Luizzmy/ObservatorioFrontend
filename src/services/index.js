import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3000/` : '/'

const service = axios.create({ 
  withCredentials: true, 
  baseURL 
});

export const obtainData=(edoFile)=>
  service.get(`/pensionResumen/${edoFile}`)

export const obtainDemo=()=>
  service.get(`/demoResumen`)
