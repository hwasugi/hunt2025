import { VStack, Button, Image, Text } from "@chakra-ui/react"
import yummy_pic from "../lib/pics/yummy_pic.jpg"
type ChildProps = {
  updateToValGame: () => void;
};
export const Homepage: React.FC<ChildProps> = ({ updateToValGame }) => {
  return (
    <VStack>
      <h1>Welcome to the Valentines Day Challenge!</h1>
      <Image src={yummy_pic} height="400px"/>
      <Text>if you can make it through the whole thing, you'll get a lil prize :O</Text>
      <Button
      h="1.75rem"
      size="sm"
      backgroundColor="red.300"
      color="White"
      onClick={() => {
        updateToValGame()
      }}>
        Start
      </Button>
    </VStack>
  )
}