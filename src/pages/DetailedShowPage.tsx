import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTVShowDetails, getSeasonDetails } from "../utils/tmdb";
import { TVShow, Episode, Season } from "../utils/tvShowTypes";
import {
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
} from "../utils/localStorage";
import "../index.css";
import { Button, Tabs, Tab, Box, CircularProgress } from "@mui/material";
import EpisodeList from "../components/EpisodeList";

const DetailedShowPage: React.FC = () => {
	const { showId } = useParams<{ showId: string }>();
	const [show, setShow] = useState<TVShow | null>(null);
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [episodes, setEpisodes] = useState<{ [key: number]: Episode[] }>({});

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
			}
		};

		fetchShowDetails();
	}, [showId]);

	const fetchSeasonDetails = async (seasonNumber: number) => {
		if (showId) {
			const seasonDetails = await getSeasonDetails(
				parseInt(showId, 10),
				seasonNumber
			);
			setEpisodes((prev) => ({
				...prev,
				[seasonNumber]: seasonDetails.episodes,
			}));
		}
	};

	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabValue(newValue);
		fetchSeasonDetails(newValue + 1);
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
			<div className="show-info row">
				<div className="show-img col-md-4">
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
					<div className="row">
						<div className="show-header col-md-12 align-items-baseline d-flex">
							<h1>{show.name}</h1>
							<h2 className="show-date px-1">
								{`(${show.first_air_date.split("-")[0]} - ${
									show.in_production
										? " Present"
										: show.last_air_date.split("-")[0]
								})`}
							</h2>
						</div>
						<div className="show-summary col-md-12">
							<span>{show.overview}</span>
						</div>
						<div className="show-status col-md-6">
							<span>Status : {show.status}</span>
						</div>
						<div className="show-ep-count col-md-6">
							<span>Number of Episodes : {show.number_of_episodes}</span>
						</div>
						<div className="show-networks col-md-12 d-inline-flex">
							<div className="stream-hd col-md-3">Streaming</div>
							<div className="col-md-9 d-inline-flex flex-wrap">
								{show.networks.map((network) => {
									return (
										<div key={network.id} className="show-network  col-md-4">
											<span className="px-2">{network.name}</span>
											<img
												src={`https://image.tmdb.org/t/p/w500${network.logo_path}`}
												alt={show.name}
												width="auto"
												height="100%"
											/>
										</div>
									);
								})}
							</div>
						</div>
						<div className="show-production col-md-12 d-inline-flex">
							<div className="stream-hd col-md-3">Prodcution</div>
							<div className="col-md-9 d-inline-flex flex-wrap">
								{show.production_companies.map((company) => {
									return (
										<div
											key={company.id}
											className="show-company show-stream  m-2"
										>
											{company.logo_path ? (
												<img
													src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
													alt={show.name}
												/>
											) : (
												<h5 className="text-nowrap">{company.name}</h5>
											)}
										</div>
									);
								})}
							</div>
						</div>
						<div className="col-md-12">
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
			<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
				<Tabs
					value={tabValue < 0 ? false : tabValue}
					onChange={handleTabChange}
					variant="scrollable"
					className="season-tabs"
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
				{seasons.map((season, index) => (
					<div
						role="tabpanel"
						hidden={tabValue !== index}
						id={`tabpanel-${index}`}
						aria-labelledby={`tab-${index}`}
						key={season.id}
					>
						{tabValue === index && (
							<Box p={3}>
								<EpisodeList
									episodes={episodes[season.season_number] || []}
									showId={Number(showId)}
								/>
							</Box>
						)}
					</div>
				))}
			</Box>
		</div>
	);
};

export default DetailedShowPage;
