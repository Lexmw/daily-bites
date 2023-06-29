import React from "react";

import { UnorderedList, ListItem, Box, Button } from "@chakra-ui/layout";

const Paginate = ({
  recipesPerPage,
  totalRecipes,
  paginate,
  nextPage,
  previousPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      className="pagination-container"
      justifyContent="center"
      display="flex"
    >
      <UnorderedList
        className="pagination"
        listStyleType="none"
        display="flex"
        gap="5px"
        m="10px"
        alignContent="center"
      >
        <ListItem
          onClick={previousPage}
          cursor="pointer"
          py="5px"
          fontWeight="700"
        >
          Prev
        </ListItem>
        {pageNumbers.map((number) => (
          <ListItem
            key={number}
            onClick={() => paginate(number)}
            borderColor="red"
            borderWidth="1px"
            w="30px"
            h="30px"
            m="5px"
            rounded="md"
            bg="red"
            color="white"
            textAlign="center"
            cursor="pointer"
            fontWeight="700"
          >
            {number}
          </ListItem>
        ))}
        <ListItem onClick={nextPage} cursor="pointer" py="5px" fontWeight="700">
          Next
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Paginate;
