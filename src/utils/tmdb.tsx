import axios from "axios";
import { CreditsData, SeasonDetails, TVShow } from "./tvShowTypes";

const API_KEY = "1b2924c29a0a7f74a248051775a9e65f";
const BASE_URL = "https://api.themoviedb.org/3";

const handleNotFoundError = (error: any) => {
	if (error.response && error.response.status === 404) {
		alert("Invalid URL. Redirecting to Home Page");
		window.location.href = "/";
	} else {
		throw error;
	}
};

export const searchTVShows = async (query: string): Promise<TVShow[]> => {
	try {
		const response = await axios.get(`${BASE_URL}/search/tv`, {
			params: {
				api_key: API_KEY,
				query,
			},
		});
		return response.data.results;
	} catch (error) {
		handleNotFoundError(error);
		return [];
	}
};

export const getTVShowDetails = async (
	showId: number
): Promise<TVShow | null> => {
	try {
		const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
			params: {
				api_key: API_KEY,
			},
		});
		return response.data;
	} catch (error) {
		handleNotFoundError(error);
		return null;
	}
};

export const getPopularTVShows = async (): Promise<TVShow[]> => {
	try {
		const response = await axios.get(`${BASE_URL}/tv/popular`, {
			params: {
				api_key: API_KEY,
			},
		});
		return response.data.results;
	} catch (error) {
		handleNotFoundError(error);
		return [];
	}
};

export const getSeasonDetails = async (
	showId: number,
	seasonNumber: number
): Promise<SeasonDetails | null> => {
	try {
		const response = await axios.get(
			`${BASE_URL}/tv/${showId}/season/${seasonNumber}`,
			{
				params: {
					api_key: API_KEY,
					language: "en-US",
				},
			}
		);
		return response.data;
	} catch (error) {
		handleNotFoundError(error);
		return null;
	}
};

export const getCredits = async (
	showId: number
): Promise<CreditsData | null> => {
	try {
		const response = await axios.get(`${BASE_URL}/tv/${showId}/credits`, {
			params: {
				api_key: API_KEY,
				language: "en-US",
			},
		});
		return response.data;
	} catch (error) {
		handleNotFoundError(error);
		return null;
	}
};
