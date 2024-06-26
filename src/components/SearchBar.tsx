import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (query.length < 1) {
			onSearch(query);
		}
	}, [onSearch, query]);

	const handleSearch = () => {
		onSearch(query);
	};
	const handleKeyDown = (e: { key: string }) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div>
			<TextField
				label="Search TV Show"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export default SearchBar;
