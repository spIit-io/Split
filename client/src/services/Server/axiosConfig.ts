import axios, { AxiosInstance } from 'axios';

export const apiInstance: AxiosInstance = axios.create({
	baseURL: "https://localhost:8000/api/",
	timeout: 1000,
});