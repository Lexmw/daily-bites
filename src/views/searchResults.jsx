import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Stack,
  CheckboxGroup,
  Checkbox,
  Flex,
  Skeleton
} from "@chakra-ui/react";
import Card from "../components/Card";
import CategoryCheckboxes from "../components/CategoryCheckboxes";
import data from "../../data";

export default function SearchResults() {
  //Maintain state for the checkboxes?
  //Maintain the state for the cards listed - Category checkboxes update the state of the cards
  // for the card I only need the name, image, area, category should I update the
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //inital page load fetch of data
    const dataFetch = async () => {
      const data = await (
        await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      ).json();

      setResults(data?.meals);
      setIsLoaded(true);
    };

    dataFetch();
  }, []);

  const newCategorySearchResults = (array1, array2) => {
    console.log(array1);
    console.log(array2)
    var differentValues = [];

    for (var i = 0; i < array1.length; i++) {
      if (!array2.some(x => x.idMeal === array1[i].idMeal)) {
        differentValues.push(array1[i]);
      }
    }

    for (var j = 0; j < array2.length; j++) {
      if (!array1.some(v => v.idMeal === array2[j].idMeal)) {
        differentValues.push(array2[j]);
      }
    }

    console.log(differentValues);
    return differentValues;
  };


  const searchCategoryRecipes = async (e) => {
    setIsLoaded(false);
    const data = await (
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value.toLowerCase()}`
      )
    ).json();

    setResults((curr) => newCategorySearchResults(data.meals, curr));

    setIsLoaded(true);
  };

  return (
    <>
      <Container id="search-results" pt="50px" maxW="100%">
        <Flex direction="row" align="flex-start" m="20">
          <Container
            w="20%"
            p="10"
            align="left"
            minW="180px"
            bg="grey"
            color="white"
            rounded="md"
          >
            <CategoryCheckboxes searchCategoryRecipes={searchCategoryRecipes} />
          </Container>
          <Container
            w="75%"
            maxW="100%"
            border="1px"
            borderColor="gray.200"
            rounded="md"
          >
            {results.map((recipe, index) => (
              <Skeleton key={recipe.idMeal} height="100%" isLoaded={isLoaded}>
                <Card
                  dishName={recipe.strMeal}
                  img={recipe.strMealThumb}
                  area={recipe?.strArea}
                  category={recipe?.strCategory}
                  id={recipe.idMeal}
                  key={recipe.idMeal}
                />
              </Skeleton>
            ))}
          </Container>
        </Flex>
      </Container>
    </>
  );
}
