import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		onSearch(query);
	};

	return (
		<div>
			<TextField
				label="Search TV Show"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button onClick={handleSearch}>Search</Button>
		</div>
	);
};

export default SearchBar;
