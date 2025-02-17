import { Flex, VStack, Button, Text, Image } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { MatchHistoryListResponse, Player, MatchData } from "@/lib/models/MatchHistoryListResponse"
import wingman from "../lib/pics/wingman.png"

type ChildProps = {
  updateToPuzzle: () => void;
};

export const ValGame: React.FC<ChildProps> = ({ updateToPuzzle }) => {
  const token = process.env.REACT_APP_VALORANT_API_KEY
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [clicked, setClicked] = useState(false)

  const glubPlayer = matchData?.players.find((player: Player) => player.name === "soogee" && player.tag === "NA1");
  const matchStartTime = matchData?.metadata.started_at ? new Date(matchData.metadata.started_at) : undefined;
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const fetchMatches = async () => {
    const url = `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/soogee/NA1?api_key=${token}&start=0&size=1`;

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MatchHistoryListResponse = await response.json()
      setMatchData(data.data[0])
      setClicked(false)
    } catch (err) {
      console.error("Error fetching match data:", err);
    }
  };

  if (clicked) {
    return (
      <VStack>
        <Flex>
          <Text>...loading up the match history...</Text>
        </Flex>
      </VStack>
    )
  }
  else if (!matchData) {
    return(
      <VStack>
        <h1>
          GO PLAY A VAL GAME AND THEN CLICK THE BUTTON
        </h1>
        <Image src={wingman} height="400px"/>
        <Button 
          h="1.75rem"
          size="sm"
          backgroundColor="pink"
          onClick={() => {
            fetchMatches()
            setClicked(true)
          }}>
          this is the button to click
        </Button>
      </VStack>
    )
  }
  else if (matchStartTime && matchStartTime < twoHoursAgo) {
    return (
      <Flex>
        <VStack>
          <Text>go play a game &gt;:(</Text>
          <Button 
            h="1.75rem"
            size="sm"
            backgroundColor="pink"
            onClick={() => {
              fetchMatches()
              setClicked(true)
            }}>
            i played a game
          </Button>
        </VStack>
      </Flex>
    )
  }
  else if (glubPlayer && (glubPlayer?.stats.kills ?? 0 <= 20)) {
    return (
      <VStack>
        <h1>
          GO PLAY A VAL GAME AND THEN CLICK THE BUTTON
        </h1>
        <Button 
          h="1.75rem"
          size="sm"
          backgroundColor="pink"
          onClick={() => {
            fetchMatches()
            setClicked(true)
          }}>
          this is the button to click
        </Button>
        {clicked && (
          <Flex>
            <Text>...loading up the match history...</Text>
          </Flex>
        )}
        {!clicked && matchData && (
          <VStack>
            <Text>oof {glubPlayer?.stats.kills} kills? :/</Text>
            <Text>these are rookie numbers, go get those stats up</Text>
            <Text>...did I mention you could play any game mode :-)</Text>
          </VStack>
        )}
      </VStack>
    )
  }
  else if (glubPlayer && (glubPlayer?.stats.kills ?? 0 <= 38)) {
    return (
      <Flex>
        <Button 
          h="1.75rem"
          size="sm"
          onClick={() => {
            fetchMatches()
            setClicked(true)
          }}>
          im almost the best
        </Button>
        {!clicked && matchStartTime && matchStartTime < twoHoursAgo && (
          <VStack>
            <Text>SHEEEEEEEEEEEEEEEEEEESH {glubPlayer?.stats.kills} KILLS?!??!!??</Text>
            <Text>sike nah these are still rookie numbers</Text>
          </VStack>
        )}
      </Flex>
    )
  }
  else if (glubPlayer && (glubPlayer?.stats.kills ?? 0 > 38)) {
    return (
      <Flex>
        <VStack>
          <Text>{glubPlayer?.stats.kills} KIILLLLLLLLLSSSSSSSSSSSSSSSSSSSSSSSSSS?!??!!??</Text>
          <Button 
            h="1.75rem"
            size="sm"
            onClick={() => {
              updateToPuzzle()
            }}>
            NEXT
          </Button>
        </VStack>
      </Flex>
    )
  }
}