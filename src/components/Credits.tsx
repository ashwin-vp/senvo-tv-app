// components/Credits.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { CreditsData } from "../utils/tvShowTypes";

import NoImage from "../images/no_image.jpg";

interface CreditsProps {
	credits: CreditsData | null;
}

const Credits: React.FC<CreditsProps> = ({ credits }) => {
	if (!credits) {
		return null;
	}

	return (
		<div className="row cast-crew-section">
			<div className="col-md-12">
				<h4>Cast</h4>
			</div>
			{credits.cast.map((castMember) => (
				<div className="col-md-3" key={"cast " + castMember.id}>
					<img
						src={
							castMember.profile_path
								? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
								: NoImage
						}
						alt={castMember.name}
						width="100px"
						height="auto"
						style={{ borderRadius: "50%" }}
					/>
					<Typography variant="body1">{castMember.name}</Typography>
					<Typography variant="body2">{castMember.character}</Typography>
				</div>
			))}
			<Typography variant="h4" mt={4}>
				Crew
			</Typography>
			<Box display="flex" flexWrap="wrap">
				{credits.crew.map((crewMember) => (
					<Box
						key={crewMember.job + " - " + crewMember.id}
						p={1}
						textAlign="center"
					>
						<img
							src={
								crewMember.profile_path
									? `https://image.tmdb.org/t/p/w500${crewMember.profile_path}`
									: NoImage
							}
							alt={crewMember.name}
							width="100px"
							height="auto"
							style={{ borderRadius: "50%" }}
						/>

						<Typography variant="body1">{crewMember.name}</Typography>
						<Typography variant="body2">{crewMember.job}</Typography>
					</Box>
				))}
			</Box>
		</div>
	);
};

export default Credits;
