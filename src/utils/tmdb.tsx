import axios from "axios";
import { CreditsData, SeasonDetails, TVShow } from "./tvShowTypes";

const API_KEY = "1b2924c29a0a7f74a248051775a9e65f";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchTVShows = async (query: string): Promise<TVShow[]> => {
	const response = await axios.get(`${BASE_URL}/search/tv`, {
		params: {
			api_key: API_KEY,
			query,
		},
	});
	return response.data.results;
};
export const getTVShowDetails = async (showId: number): Promise<TVShow> => {
	const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
		params: {
			api_key: API_KEY,
		},
	});

	return response.data;
};

export const getPopularTVShows = async (): Promise<TVShow[]> => {
	const response = await axios.get(`${BASE_URL}/tv/popular`, {
		params: {
			api_key: API_KEY,
		},
	});
	return response.data.results;
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
		console.error("Error fetching season details:", error);
		return null;
	}
};

export const getCredits = async (showId: number): Promise<CreditsData> => {
	const response = await axios.get(
		`${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}&language=en-US`
	);
	return response.data;
};
