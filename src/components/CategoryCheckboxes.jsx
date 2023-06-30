import React from "react";
import { useState, useMemo } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Box,
  Stack,
  Skeleton,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";

export default function CategoryCheckboxes(props) {
  //Pass the function for each checkbox down from the parent component that will be used to set
  // the loading state and load in new recipes
  //This should be the checkbox group, in the group we can mao through the singluar categories to show
  //the checkboxes, then well use the function later to update the results.
  const [categories, setCategories] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useMemo(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      ).json();

      setCategories(data);
      setIsLoaded(true);
    };

    dataFetch();
  }, []);

  return (
    <>
      <Box display={["none", "none", "block"]}>
        <CheckboxGroup>
          <Heading
            fontSize={["15px", "18px", "18px", "25px"]}
            mb="15px"
            textDecoration={["none", "underline"]}
          >
            Categories
          </Heading>
          <Stack spacing={[1, 5]} direction={["column"]}>
            {categories?.meals.sort().map((category, index) => (
              <Skeleton key={index + 1} height="100%" isLoaded={isLoaded}>
                <Checkbox
                  id={category.strCategory}
                  name={category.strCategory}
                  key={index}
                  value={category.strCategory}
                  onChange={(e) => props.searchCategoryRecipes(e)}
                >
                  {category.strCategory}
                </Checkbox>
              </Skeleton>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>

      <>
        <Button
          ref={btnRef}
          colorScheme="red"
          onClick={onOpen}
          display={["block", "block", "none"]}
        >
          Categories
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Categories</DrawerHeader>

            <DrawerBody>
              <Stack spacing={[1, 5]} direction={["column"]}>
                {categories?.meals.sort().map((category, index) => (
                  <Skeleton key={index + 1} height="100%" isLoaded={isLoaded}>
                    <Checkbox
                      id={category.strCategory}
                      name={category.strCategory}
                      key={index}
                      value={category.strCategory}
                      onChange={(e) => props.searchCategoryRecipes(e)}
                    >
                      {category.strCategory}
                    </Checkbox>
                  </Skeleton>
                ))}
              </Stack>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button colorScheme="blue">Go</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
}
