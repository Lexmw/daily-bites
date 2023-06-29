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
        await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=s")
      ).json();

      setResults(data?.meals);
      setIsLoaded(true);
    };

    dataFetch();
  }, []);

  const searchCategoryRecipes = async (e) => {
    setIsLoaded(false);
    const data = await (
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value.toLowerCase()}`
      )
    ).json();

    //check if the meal is already in the list if it isnt add it. If it is add it to the front of the list
    //setResults(curr => curr.filter(x => data.meals.some(value => curr.includes(value))));
    setResults((curr) => {
      let diffRecipes = data.meals.filter((x) => curr.indexOf(x) > 0);
      console.log(
        data.meals.indexOf[
          {
            idMeal: "52965",
            strMeal: "Breakfast Potatoes",
            strMealThumb:
              "https://www.themealdb.com/images/media/meals/1550441882.jpg"
          }
        ],
        curr[2],
        data.meals
      );
      console.log("diff", diffRecipes);
      return [...curr];
    });
    setIsLoaded(true);

    console.log(results);
  };

  return (
    <>
    <Container id="search-results" pt="50px"maxW="100%">
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
