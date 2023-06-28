import React from "react";
import Hero from '../components/Hero';
import SearchResults from "./searchResults";
// import RecipePage from "./RecipePage";
export default function Home () {
    return (
        <>
            <Hero />
            <SearchResults />
            {/* <RecipePage /> */}
        </>
    );
};
