// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/partner',
});

export const fetchPartners = () => API.get('/all');
export const fetchPartnerDetails = (partnerId) => API.get(`/${partnerId}`);
