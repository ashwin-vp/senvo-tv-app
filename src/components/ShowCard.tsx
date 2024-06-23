import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Box,
} from "@mui/material";
import { ShowCardProps } from "../utils/tvShowTypes";
import { Link } from "react-router-dom";
import "../index.css";
import NoImage from "../images/no_image.jpg";
import "../index.css";

const ShowCard: React.FC<ShowCardProps> = ({
	show,
	onAddToWatchlist,
	onRemoveFromWatchlist,
}) => {
	return (
		<Card
			className={`show-card ${
				onAddToWatchlist ? "" : "bg-light border border-2"
			}`}
		>
			<CardMedia
				className="show-card-image"
				component="img"
				image={
					show.poster_path
						? `https://image.tmdb.org/t/p/w500${show.poster_path}`
						: NoImage
				}
				alt={show.name}
			/>
			<CardContent className="show-overview">
				<Box display="flex" flexDirection="column" height="100%">
					<Typography variant="h6" display="block">
						{show.name}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						overflow="auto"
						flexGrow={1}
					>
						{show.overview}
					</Typography>
				</Box>
			</CardContent>
			<CardActions className="show-card-actions">
				<Button component={Link} to={`/show/${show.id}`}>
					Details
				</Button>
				{onAddToWatchlist && (
					<Button className="" onClick={() => onAddToWatchlist(show)}>
						Add to Watchlist
					</Button>
				)}
				{onRemoveFromWatchlist && (
					<Button
						className="text-danger"
						onClick={() => onRemoveFromWatchlist(show.id)}
					>
						Remove from Watchlist
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default ShowCard;
