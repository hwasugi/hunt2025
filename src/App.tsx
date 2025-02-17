import React, { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { Homepage } from './components/Homepage';
import { ValGame } from './components/ValGame';
import { QFields } from './components/QFields';
import { Test } from "./components/Test";
import { Box, Flex } from '@chakra-ui/react';
import { EndGame } from "./components/EndGame";

function App() {
  enum Status {
    Homepage = "Homepage",
    ValGame = "ValGame",
    Puzzle = "Puzzle",
    Test = "Test",
    EndGame = "EndGame"
  }
  const [status, setStatus] = useState<Status>(Status.Homepage)
  const updateToValGame = () => {
    setStatus(Status.ValGame)
  }
  const updateToPuzzle = () => {
    setStatus(Status.Puzzle)
  }
  const updateToTest = () => {
    setStatus(Status.Test)
  }
  const updateToEndGame = () => {
    setStatus(Status.EndGame)
  }
  return (
    <div className="App">
      <Flex display="flex" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
        width="100vw"
      >
        <Box
          width="70%" 
          height="70%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center" // Center children inside the box
          bg="red.50"          // Optional: Background color for visibility>
          padding="30px"
          borderRadius="lg" // Large border radius
          boxShadow="md"
        >
          {status === Status.Homepage && (<Homepage updateToValGame={updateToValGame}/>)}
          {status === Status.ValGame && (<ValGame updateToPuzzle={updateToPuzzle}/>)}
          {status === Status.Puzzle && (<QFields updateToTest={updateToTest}/>)}
          {status === Status.Test && (<Test updateToEndGame={updateToEndGame}/>)}
          {status === Status.EndGame && (<EndGame/>)}
        </Box>
      </Flex>
    </div>
  );
}

export default App;
