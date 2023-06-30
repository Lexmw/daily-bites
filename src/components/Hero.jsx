import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import heroplate from "../../public/assets/hero-plate.png";
import { HashLink as Link } from "react-router-hash-link";

export default function Hero() {
  return (
    <Container bg="black" maxH="100%" minh="200px" color="white" maxW="100%">
      <HStack w="100%" px="5" py={["50", "50", "12"]} justifyContent="center" flexWrap="wrap">
        <VStack
          w={{ base: "100%", sm: "100%", md: "30%" }}
          alignItems={["center", "center", "flex-start"]}
          maxW={{ base: "100%", sm: "40%", md: "30%" }}
        >
          <Heading size="4xl" textAlign={["center", "center", "left"]} lineHeight="1.0499996em">
            The <br />
            Daily Bites
          </Heading>
          <Text textAlign="left" fontSize="18" mt="5px">
            Find a meal to cook tonight
          </Text>
          <Link smooth to="/#search-recipes">
            <Button
              colorScheme="red"
              variant="solid"
              my="10"
              size="lg"
              fontSize="20px"
            >
              Search Now
            </Button>
          </Link>
        </VStack>
        <Image
          objectFit="cover"
          overflow="hidden"
          maxW={{ base: "230px", sm: "100px", md: "80%" }}
          maxH={{ base: "230px", sm: "100px", md: "300px", lg: "800px" }}
          h="700px"
          src={heroplate}
          alt="A photo of roasted chicken and red saice on a white plate."
        />
      </HStack>
    </Container>
  );
}
