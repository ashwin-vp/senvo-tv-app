import React, { useState, useEffect } from "react";
import ShowCard from "../components/ShowCard";
import { TVShow } from "../utils/tvShowTypes";
import { getWatchlist, removeFromWatchlist } from "../utils/localStorage";
import "../index.css";

const WatchlistPage: React.FC = () => {
	const [watchlist, setWatchlist] = useState<TVShow[]>(getWatchlist());

	const handleRemoveFromWatchlist = (showId: number) => {
		removeFromWatchlist(showId);
		setWatchlist(getWatchlist());
	};

	return (
		<div className="show-grid">
			{watchlist.map((show) => (
				<ShowCard
					key={show.id}
					show={show}
					onRemoveFromWatchlist={handleRemoveFromWatchlist}
				/>
			))}
		</div>
	);
};

export default WatchlistPage;
