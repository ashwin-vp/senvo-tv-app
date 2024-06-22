import React, { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import { getPopularTVShows } from "../utils/tmdb";
import { TVShow } from "../utils/tvShowTypes";
import {
	addToWatchlist,
	getWatchlist,
	isInWatchlist,
	removeFromWatchlist,
} from "../utils/localStorage";

const PopularPage: React.FC = () => {
	const [shows, setShows] = useState<TVShow[]>([]);

	const [watchlist, setWatchlist] = useState<TVShow[]>(getWatchlist());

	useEffect(() => {
		const fetchPopularShows = async () => {
			const popularShows = await getPopularTVShows();
			setShows(popularShows);
		};

		fetchPopularShows();
	}, []);

	const handleAddToWatchlist = (show: TVShow) => {
		addToWatchlist(show);
		setWatchlist(getWatchlist());
	};
	const handleRemoveFromWatchlist = (showId: number) => {
		removeFromWatchlist(showId);
		setWatchlist(getWatchlist());
	};
	return (
		<div className="show-grid">
			{shows.map((show) => (
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
			))}
		</div>
	);
};

export default PopularPage;
