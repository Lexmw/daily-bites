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
import Paginate from "../components/Paginate";

export default function SearchRecipes() {
  //Maintain state for the checkboxes?
  //Maintain the state for the cards listed - Category checkboxes update the state of the cards
  // for the card I only need the name, image, area, category should I update the
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(5);

  const indexOfLastrecipe = currentPage * recipesPerPage;
  const indexOfFirstrecipe = indexOfLastrecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstrecipe, indexOfLastrecipe);

  useEffect(() => {
    //inital page load of recipe data
    const dataFetch = async () => {
      const data = await (
        await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
      ).json();

      setRecipes(data?.meals);
      setIsLoaded(true);
    };

    dataFetch();
  }, []);

  const categorySearchRecipes = (array1, array2) => {
    var differentValues = [];

    for (var i = 0; i < array1.length; i++) {
      if (!array2.some((x) => x.idMeal === array1[i].idMeal)) {
        differentValues.push(array1[i]);
      }
    }

    for (var j = 0; j < array2.length; j++) {
      if (!array1.some((v) => v.idMeal === array2[j].idMeal)) {
        differentValues.push(array2[j]);
      }
    }

    return differentValues;
  };

  const searchCategoryRecipes = async (e) => {
    setIsLoaded(false);
    const data = await (
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value.toLowerCase()}`
      )
    ).json();

    setRecipes((curr) => categorySearchRecipes(data.meals, curr));
    setIsLoaded(true);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(recipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Container id="search-recipes" maxW="100%">
        <Flex direction="row" align="flex-start" m="10">
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
            {currentRecipes.map((recipe, index) => (
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
            <Paginate
              recipesPerPage={recipesPerPage}
              totalRecipes={recipes.length}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </Container>
        </Flex>
      </Container>
    </>
  );
}
