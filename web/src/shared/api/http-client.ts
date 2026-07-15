import axios, { type AxiosError } from "axios";

interface ApiErrorBody {
	message?: string;
}

const API_BASE_URL = "http://localhost:3000/api/v1";

export const httpClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

httpClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorBody>) => {
		const message = error.response?.data?.message ?? error.message ?? "Something went wrong";
		return Promise.reject(new Error(message));
	},
);
