import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";
import DetailedShowPage from "./pages/DetailedShowPage";
import PopularPage from "./pages/PopularPage";
import Header from "./components/Header";

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/watchlist" element={<WatchlistPage />} />
				<Route path="/show/:showId" element={<DetailedShowPage />} />
				<Route path="/popular" element={<PopularPage />} />
			</Routes>
		</Router>
	);
};

export default App;
