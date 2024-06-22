import React, { useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { Episode, EpisodeListProps } from "../utils/tvShowTypes";
import {
	getWatchedEpisodes,
	markEpisodeAsWatched,
	unmarkEpisodeAsWatched,
} from "../utils/localStorage";
import dayjs from "dayjs";
import NoImage from "../images/no_image.jpg";

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, showId }) => {
	const [watchedEpisodes, setWatchedEpisodes] = useState<number[]>(
		getWatchedEpisodes(showId)
	);

	const onMarkAsWatched = (episodeId: number) => {
		if (showId) {
			markEpisodeAsWatched(showId, episodeId);
			setWatchedEpisodes(getWatchedEpisodes(showId));
		}
	};

	const onUnmarkAsWatched = (episodeId: number) => {
		if (showId) {
			unmarkEpisodeAsWatched(showId, episodeId);
			setWatchedEpisodes(getWatchedEpisodes(showId));
		}
	};

	const showEpisode = (episode: Episode) => {
		if (episode) {
			const airDate = dayjs(episode.air_date);
			if (airDate.isAfter(dayjs().add(7, "day"))) {
				return false;
			} else return true;
		}
	};

	return (
		<List>
			{episodes.length
				? episodes.map(
						(episode) =>
							showEpisode(episode) && (
								<ListItem
									key={episode.id}
									className={`row ${
										watchedEpisodes.includes(episode.id)
											? "bg-light border border-2"
											: ""
									}`}
								>
									<img
										className="episode-image px-4 col-md-3"
										src={
											episode.still_path
												? `https://image.tmdb.org/t/p/w500${episode.still_path}`
												: NoImage
										}
										width="auto"
										alt=""
										height="auto"
									/>

									<ListItemText
										className="col-md-5"
										primary={`Episode ${episode.episode_number} : ${episode.name}`}
										secondary={episode.overview}
									/>

									{watchedEpisodes.includes(episode.id) ? (
										<Button
											className="col-md-3  text-danger"
											onClick={() => onUnmarkAsWatched(episode.id)}
										>
											Unmark as Watched
										</Button>
									) : (
										<Button
											className="col-md-3"
											onClick={() => onMarkAsWatched(episode.id)}
										>
											Mark as Watched
										</Button>
									)}
								</ListItem>
							)
				  )
				: ""}
		</List>
	);
};

export default EpisodeList;
