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
		<>
			<h4>Cast</h4>
			<div className="row cast-crew-section">
				<Box display="flex" flexWrap="wrap" justifyContent="space-around">
					{credits.cast.map((castMember) => (
						<Box
							key={castMember.character + " - " + castMember.id}
							p={1}
							textAlign="center"
							style={{ maxWidth: "40%" }}
						>
							<img
								src={
									castMember.profile_path
										? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
										: NoImage
								}
								alt={castMember.name}
								width="100px"
								height="auto"
								style={{ borderRadius: "50%", objectFit: "cover" }}
							/>
							<Typography variant="body1">{castMember.name}</Typography>
							<Typography variant="body2">{castMember.character}</Typography>
						</Box>
					))}
				</Box>
			</div>
			<>
				<h4>Crew</h4>
				<div className="row cast-crew-section">
					<Box display="flex" flexWrap="wrap" justifyContent="space-around">
						{credits.crew.map((crewMember) => (
							<Box
								key={crewMember.job + " - " + crewMember.id}
								p={1}
								textAlign="center"
								style={{ maxWidth: "40%" }}
							>
								<img
									src={
										crewMember.profile_path
											? `https://image.tmdb.org/t/p/w500${crewMember.profile_path}`
											: NoImage
									}
									alt={crewMember.name}
									width="100px"
									height="150px"
									style={{ borderRadius: "50%", objectFit: "cover" }}
								/>

								<Typography variant="body1">{crewMember.name}</Typography>
								<Typography variant="body2">{crewMember.job}</Typography>
							</Box>
						))}
					</Box>
				</div>
			</>
		</>
	);
};

export default Credits;
