//This page can be solo and will be handling the state on its own. It will only have to display for on single recipe
import {
  AbsoluteCenter,
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
  UnorderedList,
  VStack,
  ListItem,
  AspectRatio,
  Image,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import React from "react";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";

export default function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { recipeId } = useParams();

  useMemo(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        )
      ).json();

      setRecipe(data.meals);
      setIsLoaded(true);
    };

    dataFetch();
  }, []);

  return (
    <>
      <Header />
      {recipe?.map((info, index) => (
        <Container maxW="100%" p="20" key={index}>
          <Container maxW="100%">
            <HStack>
              <Skeleton w="40%" isLoaded={isLoaded} borderRadius="full">
                <Box >
                  <Image
                    src={info.strMealThumb}
                    borderRadius="full"
                    borderColor="black"
                    borderWidth="5px"
                  />
                </Box>
              </Skeleton>
              <Box>
                <VStack ml="20" alignItems="flex-start">
                  <Skeleton isLoaded={isLoaded}>
                    <Heading fontSize="50px">{info.strMeal}</Heading>
                    <Text fontSize="20px" textAlign="left">
                      {info.strCategory} &#8226; {info.strArea}
                    </Text>
                  </Skeleton>
                  <Box
                    maxW="100%"
                    w="100%"
                    mt="10"
                    p="5"
                    borderWidth="3px"
                    borderColor="black"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Text fontWeight="700">Ingredients: </Text>
                    <SkeletonText
                      noOfLines={6}
                      my="10px"
                      isLoaded={isLoaded}
                    >
                      <UnorderedList>
                        {info.strIngredient1 ? (
                          <ListItem>
                            {info.strMeasure1} {info.strIngredient1}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient2 ? (
                          <ListItem>
                            {info.strMeasure2} {info.strIngredient2}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient3 ? (
                          <ListItem>
                            {info.strMeasure3} {info.strIngredient3}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient4 ? (
                          <ListItem>
                            {info.strMeasure4} {info.strIngredient4}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient5 ? (
                          <ListItem>
                            {info.strMeasure5} {info.strIngredient5}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient6 ? (
                          <ListItem>
                            {info.strMeasure6} {info.strIngredient6}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient7 ? (
                          <ListItem>
                            {info.strMeasure7} {info.strIngredient7}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient8 ? (
                          <ListItem>
                            {info.strMeasure8} {info.strIngredient8}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient9 ? (
                          <ListItem>
                            {info.strMeasure9} {info.strIngredient9}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient10 ? (
                          <ListItem>
                            {info.strMeasure10} {info.strIngredient10}{" "}
                          </ListItem>
                        ) : null}
                        {info.strIngredient11 ? (
                          <ListItem>
                            {info.strMeasure11} {info.strIngredient11}{" "}
                          </ListItem>
                        ) : null}

                        {info.strIngredient12 ? (
                          <ListItem>
                            {info.strMeasure12} {info.strIngredient12}{" "}
                          </ListItem>
                        ) : null}

                        {info.strIngredient13 ? (
                          <ListItem>
                            {info.strMeasure13} {info.strIngredient13}{" "}
                          </ListItem>
                        ) : null}
                      </UnorderedList>
                    </SkeletonText>
                  </Box>
                </VStack>
              </Box>
            </HStack>

            <Box position="relative" padding="10">
              <Divider my="20" />
              <AbsoluteCenter
                bg="white"
                px="4"
                fontSize="25px"
                fontWeight="700"
              >
                Instructions
              </AbsoluteCenter>
            </Box>
          </Container>

          <SkeletonText noOfLines={15} isLoaded={isLoaded}>
            <Text whiteSpace="pre-line" lineHeight="2" px="5">
              {info.strInstructions}
            </Text>
          </SkeletonText>

          <Divider orientation="horizontal" my="20" />

          <Skeleton isLoaded={isLoaded}>
            <AspectRatio maxW="70%" ratio={4 / 3} my="50" mx="auto">
              <iframe
                title="naruto"
                src={recipe[0].strYoutube.replace("watch?v=", "embed/")}
                allowFullScreen
              />
            </AspectRatio>
          </Skeleton>
        </Container>
      ))}
    </>
  );
}

// info.PropTypes = {`
//     recipe: PropTypes.object.isRequired
// };
