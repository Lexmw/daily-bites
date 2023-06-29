import { Image, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../../public/assets/logo.svg";

export default function Header() {
  return (
    <Container
      display="flex"
      gap="5px"
      position="fixed"
      top="0"
      zIndex="10"
      bg="black"
      maxW="100%"
      p="2px"
      alignItems="center"
    >
      <Link to="/">
        <Image src={logo} w="45px" m="1" mx="10" />
      </Link>
      <Heading color="white" fontWeight="700" fontSize="20">The Daily Bites</Heading>
    </Container>
  );
}
