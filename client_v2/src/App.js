import { Box,Text } from "@chakra-ui/react";
import Signin from "./components/authentification/signin";
import Signup from "./components/authentification/signup";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

function App() {
  return (
    <Box h="100vh">
      <Header />
      <Signup />
      <Footer />
    </Box>
  );
}

export default App;
