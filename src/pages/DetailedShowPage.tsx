import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTVShowDetails, getSeasonDetails, getCredits } from "../utils/tmdb";
import { TVShow, Episode, Season, CreditsData } from "../utils/tvShowTypes";
import {
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
} from "../utils/localStorage";
import "../index.css";
import {
	Button,
	Tabs,
	Tab,
	Box,
	CircularProgress,
	Tooltip,
} from "@mui/material";
import EpisodeList from "../components/EpisodeList";
import Credits from "../components/Credits";

const DetailedShowPage: React.FC = () => {
	const { showId } = useParams<{ showId: string }>();
	const [show, setShow] = useState<TVShow | null>(null);
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [episodes, setEpisodes] = useState<{ [key: number]: Episode[] }>({});
	const [credits, setCredits] = useState<CreditsData | null>(null);
	const [watchlist, setWatchlist] = useState<number[]>(
		getWatchlist().map((show) => show.id)
	);
	const [tabValue, setTabValue] = useState(-1);

	useEffect(() => {
		const fetchShowDetails = async () => {
			if (showId) {
				const details = await getTVShowDetails(parseInt(showId, 10));
				setShow(details);
				setSeasons(details.seasons);

				const creditsData = await getCredits(parseInt(showId, 10));
				setCredits(creditsData);
			}
		};

		fetchShowDetails();
	}, [showId]);

	const fetchSeasonDetails = async (seasonNumber: number) => {
		if (showId && !episodes[seasonNumber]) {
			const seasonDetails = await getSeasonDetails(
				parseInt(showId, 10),
				seasonNumber
			);

			setEpisodes((prev) => ({
				...prev,
				[seasonNumber]: seasonDetails ? seasonDetails.episodes : [],
			}));
		}
	};

	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabValue(newValue);
		if (show && show?.number_of_seasons === show?.seasons.length) {
			fetchSeasonDetails(newValue + 1);
		} else {
			fetchSeasonDetails(newValue);
		}
	};

	const handleAddToWatchlist = () => {
		if (show) {
			addToWatchlist(show);
			setWatchlist(getWatchlist().map((show) => show.id));
		}
	};

	const handleRemoveFromWatchlist = () => {
		if (showId) {
			removeFromWatchlist(parseInt(showId, 10));
			setWatchlist(getWatchlist().map((show) => show.id));
		}
	};

	if (!show) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="p-4 d-flex flex-column">
			<div className="row show-intro px-2">
				<div className="col-md-12 flex-row d-inline-flex justify-content-center align-items-baseline">
					<h1>{show.name}</h1>
					<h2 className="show-date px-1">
						{`(${show.first_air_date.split("-")[0]} - ${
							show.in_production ? " Present" : show.last_air_date.split("-")[0]
						})`}
					</h2>
				</div>
				<div className="show-img col-md-4 p-0">
					{show.poster_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
							alt={show.name}
							width="100%"
							height="auto"
						/>
					) : (
						""
					)}
				</div>
				<div className="show-details col-md-8 ">
					<div className="row show-info">
						<div className="show-header col-md-12 align-items-baseline d-flex"></div>
						<div className="show-summary col-md-12">
							<span>{show.overview}</span>
						</div>
						<div className="show-status col-md-4 py-2">
							<span>
								<h4>Status</h4> <p>{show.status}</p>
							</span>
						</div>
						<div className="show-status col-md-4 py-2">
							<span>
								<h4>Seasons</h4> <p>{show.number_of_seasons}</p>
							</span>
						</div>
						<div className="show-ep-count col-md-4 py-2">
							<span>
								<h4>Number of Episodes</h4> <p>{show.number_of_episodes}</p>
							</span>
						</div>
						<div className="col-md-12">
							<h4>Streaming</h4>
						</div>
						<div className="show-networks col-md-12">
							<div className="row">
								{show.networks.map((network) => {
									return (
										<div key={network.id} className="show-network  col-md-3">
											<Tooltip title={network.name} placement="top">
												<img
													src={`https://image.tmdb.org/t/p/w500${network.logo_path}`}
													alt={show.name}
													width="auto"
													height="100%"
												/>
											</Tooltip>
										</div>
									);
								})}
							</div>
						</div>

						<Credits credits={credits} />
						<div className="col-md-12 d-inline-flex justify-content-center">
							{watchlist.includes(show.id) ? (
								<Button onClick={handleRemoveFromWatchlist}>
									Remove from Watchlist
								</Button>
							) : (
								<Button onClick={handleAddToWatchlist}>Add to Watchlist</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			<Box
				className="show-season-episodes"
				sx={{ width: "100%", bgcolor: "background.paper" }}
			>
				<Tabs
					value={tabValue < 0 ? false : tabValue}
					onChange={handleTabChange}
					variant="scrollable"
					className="season-tabs bg-light"
				>
					{seasons.map((season, index) => (
						<Tab
							label={
								!season.season_number
									? "Specials"
									: "Season " + season.season_number
							}
							key={season.id}
							disabled={season.episode_count ? false : true}
						/>
					))}
				</Tabs>
				{seasons[tabValue] && (
					<div
						role="tabpanel"
						id={`tabpanel-${tabValue}`}
						aria-labelledby={`tab-${tabValue}`}
						key={seasons[tabValue].id}
					>
						<>
							{seasons[tabValue].overview ? (
								<div className="show-summary col-md-12 p-3">
									<h4>Summary</h4>
									<span>{seasons[tabValue].overview}</span>
								</div>
							) : (
								""
							)}

							<Box p={3}>
								<EpisodeList
									episodes={episodes[seasons[tabValue].season_number] || []}
									showId={Number(showId)}
								/>
							</Box>
						</>
					</div>
				)}
			</Box>
		</div>
	);
};

export default DetailedShowPage;
