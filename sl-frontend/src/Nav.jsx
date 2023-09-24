import { 
    Button, 
    Box,
    SimpleGrid,
    Link
} from "@chakra-ui/react";


export default function Nav() {
  return (
    <Box>
        <Box 
            width="20vw"
            height="100vh"
            backgroundColor="#349EF3"
            >
            <SimpleGrid columns={2} spacing={3} padding={2.5}>
                <Button 
                width="100px"
                color={"#E0E0E0"}
                bgColor={"#424242"}
                padding={6}
                _hover={{ bg: "#1A237E" }}
                ><Link
                href="/chatroom"
                _hover={{ textDecoration: "none" }}
                > New Chat </Link> </Button>
                <Button 
                width="100px"
                color={"#E0E0E0"}
                bgColor={"#424242"}
                padding={6}
                _hover={{ bg: "#1A237E" }}
                ><Link
                href="/private-chatroom"
                _hover={{ textDecoration: "none" }}
                > Private <br/> Chat </Link> </Button>
            </SimpleGrid>
      </Box>
    </Box>
  )
}