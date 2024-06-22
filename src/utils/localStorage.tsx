import { TVShow } from "../utils/tvShowTypes";

const WATCHLIST_KEY = "watchlist";
const WATCHED_EPISODES_KEY = "watchedEpisodes";

export const getWatchlist = (): TVShow[] => {
	const watchlist = localStorage.getItem(WATCHLIST_KEY);
	return watchlist ? JSON.parse(watchlist) : [];
};

export const addToWatchlist = (show: TVShow) => {
	const watchlist = getWatchlist();
	watchlist.push(show);
	localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};

export const removeFromWatchlist = (showId: number) => {
	const watchlist = getWatchlist().filter((show) => show.id !== showId);
	localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};

export const getWatchedEpisodes = (showId: number): number[] => {
	const watchedEpisodes = localStorage.getItem(WATCHED_EPISODES_KEY);
	const parsed = watchedEpisodes ? JSON.parse(watchedEpisodes) : {};
	return parsed[showId] || [];
};

export const markEpisodeAsWatched = (showId: number, episodeId: number) => {
	const watchedEpisodes = getWatchedEpisodes(showId);
	if (!watchedEpisodes.includes(episodeId)) {
		watchedEpisodes.push(episodeId);
		const allWatchedEpisodes = {
			...JSON.parse(localStorage.getItem(WATCHED_EPISODES_KEY) || "{}"),
			[showId]: watchedEpisodes,
		};
		localStorage.setItem(
			WATCHED_EPISODES_KEY,
			JSON.stringify(allWatchedEpisodes)
		);
	}
};

export const unmarkEpisodeAsWatched = (showId: number, episodeId: number) => {
	const watchedEpisodes = getWatchedEpisodes(showId).filter(
		(id) => id !== episodeId
	);
	const allWatchedEpisodes = {
		...JSON.parse(localStorage.getItem(WATCHED_EPISODES_KEY) || "{}"),
		[showId]: watchedEpisodes,
	};
	localStorage.setItem(
		WATCHED_EPISODES_KEY,
		JSON.stringify(allWatchedEpisodes)
	);
};

export const isEpisodeWatched = (
	showId: number,
	episodeId: number
): boolean => {
	const watchedEpisodes = getWatchedEpisodes(showId);
	return watchedEpisodes.includes(episodeId);
};

export const isInWatchlist = (showId: number): boolean =>
	getWatchlist().some((watchlistItem) => watchlistItem.id === showId);
