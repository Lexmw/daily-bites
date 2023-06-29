import React from "react";
import Hero from '../components/Hero';
import SearchResults from "./searchResults";
import Header from "../components/Header";

export default function Home () {
    return (
        <>
            <Header />
            <Hero />
            <SearchResults />
        </>
    );
};
