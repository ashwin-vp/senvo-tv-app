import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ShowCard from "../components/ShowCard";
import { getTVShowDetails, searchTVShows } from "../utils/tmdb";
import { TVShow } from "../utils/tvShowTypes";
import {
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
	isInWatchlist,
} from "../utils/localStorage";
import dayjs from "dayjs";

const HomePage: React.FC = () => {
	const [shows, setShows] = useState<TVShow[]>([]);
	const [upcomingShows, setUpcomingShows] = useState<TVShow[]>([]);
	const [watchlist, setWatchlist] = useState<TVShow[]>(getWatchlist());
	const [query, setQuery] = useState<String>("");

	useEffect(() => {
		const fetchUpcomingEpisodes = async () => {
			const watchlist = getWatchlist();
			setWatchlist(watchlist);

			const upcomingEpisodes: TVShow[] = [];

			for (const show of watchlist) {
				const showDetails = await getTVShowDetails(show.id);
				const nextEpisode = showDetails.next_episode_to_air;

				if (nextEpisode) {
					const airDate = dayjs(nextEpisode.air_date);
					if (
						airDate.isAfter(dayjs()) &&
						airDate.isBefore(dayjs().add(7, "day"))
					) {
						upcomingEpisodes.push(showDetails);
						// upcomingEpisodes.push(nextEpisode);
					}
				}
			}
			setUpcomingShows(upcomingEpisodes);
			setShows(upcomingEpisodes);
		};

		fetchUpcomingEpisodes();
	}, []);

	const handleSearch = async (query: string) => {
		setQuery(query);
		if (!query.length) {
			setShows(upcomingShows);
		} else {
			const results = await searchTVShows(query);
			setShows(results);
		}
	};

	const handleAddToWatchlist = (show: TVShow) => {
		addToWatchlist(show);
		setWatchlist(getWatchlist());
	};
	const handleRemoveFromWatchlist = (showId: number) => {
		removeFromWatchlist(showId);
		setWatchlist(getWatchlist());
	};

	return (
		<div className="home-page pt-3">
			<div className="home-top">
				<h2>{shows === upcomingShows ? "Upcoming Shows" : "Search Results"}</h2>

				<SearchBar onSearch={handleSearch} />
			</div>

			<div className="show-grid">
				{shows.length ? (
					shows.map((show) => (
						<ShowCard
							key={show.id}
							show={show}
							onAddToWatchlist={
								!isInWatchlist(show.id) ? handleAddToWatchlist : undefined
							}
							onRemoveFromWatchlist={
								isInWatchlist(show.id) ? handleRemoveFromWatchlist : undefined
							}
						/>
					))
				) : (
					<p>{query.length ? `No Results` : `Add shows to your watchlish`}</p>
				)}
			</div>
		</div>
	);
};

export default HomePage;
