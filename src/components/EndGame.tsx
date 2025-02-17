import { VStack, HStack, Button, Text, Image, Spacer } from "@chakra-ui/react"
import { useState } from "react"
import violence_cat from "../lib/pics/violence-cat.gif"
import cute_pic from "../lib/pics/cute_pic.jpg"

export const EndGame: React.FC = () => {
  enum Decision {
    Yes = "Yes",
    No = "No",
    None = "None"
  }

  const [clicked, setClicked] = useState(false)
  const [decision, setDecision] = useState<Decision>(Decision.None)

  const onNext = () => {
    setClicked(true)
  }
  const onNo= () => {
    setDecision(Decision.No)
  }
  const onYes= () => {
    setDecision(Decision.Yes)
  }

  if (!clicked) {
    return (
      <VStack>
        <h1>congratulations, you made it to the end!</h1>
        <h1>...</h1>
        <h2>I just have one more question for you before we finish &gt;:)</h2>
        <Button 
        h="1.75rem"
        size="md"
        backgroundColor="red.300"
        color="White"
        onClick={() => {
          onNext()
        }}>
          Okay
        </Button>
      </VStack>
    )
  }
  else if (clicked) {
    if (decision === Decision.None) {
      return (
        <VStack>
          <h1>will you be my valentine?</h1>
          <HStack>
            <Button 
              h="1.75rem"
              size="md"
              backgroundColor="red.300"
              color="White"
              onClick={() => {
                onYes()
              }}>
              Yes
            </Button>
            <Button 
              h="1.75rem"
              size="md"
              backgroundColor="red.300"
              color="White"
              onClick={() => {
                onNo()
              }}>
              No
            </Button>
          </HStack>
        </VStack>
      )
    }
    else if (decision === Decision.Yes) {
      return (
        <VStack>
          <h1>im the rizzler &lt;3</h1>
          <Image src={cute_pic} height="400px"/>
          <Text>ill give you your prize tomorrow :)</Text>
        </VStack>
      )
    }
    else if (decision === Decision.No) {
      return (
        <VStack>
          <h1>Ahahahahahshahsdhfaskdjhfalshdfhashahaha</h1>
          <Image src={violence_cat} height="400px"/>
          <Text>mAYbe TrY aGAiN</Text>
          <Spacer padding="1em"/>
          <Text>BE MY VALENTINE</Text>
          <Button 
            h="1.75rem"
            size="md"
            backgroundColor="red.300"
            color="White"
            onClick={() => {
              onYes()
            }}>
            YESYESYES
          </Button>
        </VStack>
      )
    }
  }
}