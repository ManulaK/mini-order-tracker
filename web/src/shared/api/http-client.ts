import axios, { AxiosHeaders, type AxiosError, type InternalAxiosRequestConfig } from "axios";

interface ApiErrorBody {
	message?: string;
}

const API_BASE_URL = "http://localhost:3000";

// One Axios client is reused by all modules so base URL, headers, and errors
// stay consistent across the web app.
export const httpClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	// This runs before every request. Put common headers here once instead of
	// repeating them in every endpoint file.
	const headers = AxiosHeaders.from(config.headers);
	headers.set("Accept", "application/json");

	// Future login work can store a token here; every request will receive it.
	const token = window.localStorage.getItem("auth_token");
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	config.headers = headers;
	return config;
});

httpClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorBody>) => {
		// Canceled requests are normal during unmounts, so keep the original error
		// shape and let hooks ignore it cleanly.
		if (axios.isCancel(error)) {
			return Promise.reject(error);
		}

		// Convert Axios' nested error shape into one readable Error message for UI.
		const message = error.response?.data?.message ?? error.message ?? "Something went wrong";
		return Promise.reject(new Error(message));
	},
);

export const isHttpRequestCanceled = (error: unknown) => axios.isCancel(error);
