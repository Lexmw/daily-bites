//this is a singular card that is being displayed multiple times in the results page
//the state of the card will be handled above in the main view... the data will be passed by props to each card

import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import { Card, CardBody, LinkBox, Heading, Image, Text, Stack, HStack } from "@chakra-ui/react";

export default function Card(props) {
  const { dishName, img, area, category, id } = props;

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      mt="5"
      w="100%"
      // h="100"
      // maxh="125"
      boxShadow='md'
    >
      <LinkBox as="article" w='100%' p="2" rounded="md">
        <Link to={`recipe/${id}`}>
          <HStack>
            <Image
              objectFit="contain"
              maxW={{ base: "100%", sm: "75px" }}
              h={["60px", "100px", "100%"]}
              src={img}
              alt="Caffe Latte"
              rounded="md"
            />

            <Stack>
              <CardBody p="1">
                <Heading size={["sm","sm","md"]}> {dishName} </Heading>
                {area && category ? <Text size={["sm","sm","md"]}>{area} • {category}</Text> : null}
              </CardBody>
            </Stack>
          </HStack>
        </Link>
      </LinkBox>
    </Card>
  );
}

// Card.PropTypes = {
//   img: PropTypes.string,
//   dishName: PropTypes.string.isRequired,
//   area: PropTypes.string,
//   category: PropTypes.string
// };
