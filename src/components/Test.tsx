import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Image,
  Input,
  Button,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import whos_that_pokemon from '../lib/pics/whos_that_pokemon.png'
import whos_that_pokemon_answer from '../lib/pics/whos_that_pokemon_answer.png'

type ChildProps = {
  updateToEndGame: () => void;
};
export const Test: React.FC<ChildProps> = ({updateToEndGame}) => {
  enum Status {
    Win = "Win",
    Lose = "Lose",
    EndMessage = "EndMessage",
    Question = "Question"
  }
  const [input, setInput] = useState('')
  const [isError, setIsError] = useState(false)
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [counter, setCounter] = useState(1)
  const [status, setStatus] = useState(Status.Question)

  const questionAnswerList = [
    {
      questionNumber: 0,
      question: `RAPID FIRE TEST TIME
        --------------------------------------------------------------------------------------------
        WARNING:
        do not add any white space or dumb shit like that around your answer. this is not coded optimally`,
      answer: "",
      tips: "You must get at least a 100% before moving on",
      message: ""
    },
    {
      questionNumber: 1,
      question: "what league of legends character have I dressed up as for Halloween?",
      answer: "kindred",
      tips: "",
      message: ""
    },
    {
      questionNumber: 2,
      question: `what was my very first league of legends main?`,
      answer: "nidalee",
      tips: "",
      message: ""
    },
    {
      questionNumber: 3,
      question: `for how many summers did I go to music camp?`,
      answer: "4",
      tips: "use an integer number",
      message: ""
    },
    {
      questionNumber: 4,
      question: `what is the title of my favorite song RIGHT NOW`,
      answer: "lucky",
      tips: "",
      message: ""
    },
    {
      questionNumber: 5,
      question: `who does lumpy and birb love more?`,
      answer: "hwa",
      tips: "(hwa or jaden)",
      message: ""
    },
    {
      questionNumber: 6,
      question: `if I was a pizza, would you still love me?`,
      answer: "",
      tips: "(yes or no)",
      message: ""
    },
    {
      questionNumber: 7,
      question: `which knee did i get surgery on in junior year of high school?`,
      answer: "east",
      tips: "(east or west)",
      message: ""
    },
    {
      questionNumber: 8,
      question: `on what day did we first friend each other on league of legends?`,
      answer: "2022-03-21",
      tips: "yyyy-mm-dd format",
      message: ""
    },
    {
      questionNumber: 9,
      question: `what was my first major in college?`,
      answer: "computer engineering",
      tips: "",
      message: "Question 10 -- LAST QUESTION"
    },
    {
      questionNumber: 10,
      question: `who's that pokemon?`,
      answer: "gastly",
      tips: "",
      message: ""
    },
  ];

  const formatQuestionText = (text: string): JSX.Element[] => {
    const sentences = text.split("\n") // Split on punctuation followed by space
    return sentences.map((sentence, index) => (
      <div key={index}>{sentence}</div>
    ));
  };
  
  const handleInputChange = (e: any) => {
    setIsError(false)
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  

  const onSubmit = () => {
    if (questionAnswerList[question].questionNumber === 6) {
      if (input.toLowerCase() === 'yes' || input.toLowerCase() === 'no') {
        setScore(score + 1)
      }
    }
    else if (input.toLowerCase() === questionAnswerList[question].answer && questionAnswerList[question].questionNumber !== 0) {
      setScore(score + 1)
    }
    if (question + 1 <= 10) {
      if (questionAnswerList[question].message === "") {
        onNext()
      }
      else {
        setStatus(Status.EndMessage)
      }
    } else {
      setStatus(Status.EndMessage)
    }
  }

  const onNext = () => {
    if (question < 10) {
      setQuestion(question + 1)
      setInput('')
      setIsError(false)
      setStatus(Status.Question)
      console.log(score)
    }
    else {
      if (score === 10) {
        setStatus(Status.Win)
      }
      else {
        setStatus(Status.Lose)
      }
    }
  }

  const onTryAgain = () => {
    setQuestion(0)
    setCounter(counter + 1)
    setScore(0)
    setStatus(Status.Question)
  }

  if (status === Status.Lose) {
    return (
      <VStack>
        <Text width="50em">You Scored: {score} / 10</Text>
        <Text width="50em">but i will grant you another try because im so generous</Text>
        <Spacer padding="1em"/>
        <Button onClick={() => onTryAgain()} backgroundColor="red.300" color="White">
          try again
        </Button>
      </VStack>
    )
  }
  else if (status === Status.Win) {
    return (
      <VStack>
        <Text width="50em">YOU DID IT</Text>
        <Text width="50em">IT ONLY TOOK {counter} TRIES</Text>
        <Spacer padding="1em"/>
        <Button onClick={() => updateToEndGame()} backgroundColor="red.300" color="White">
          next
        </Button>
      </VStack>
    )
  }
  else if (status === Status.EndMessage) {
    return (
      <VStack>
        <Text width="50em">{formatQuestionText(questionAnswerList[question].message)}</Text>
        <Spacer padding="1em"/>
        {questionAnswerList[question].questionNumber === 10 && (<Image src={whos_that_pokemon_answer} height="400px"/>)}
        <Button onClick={() => onNext()} backgroundColor="red.300" color="White">
          next
        </Button>
      </VStack>
    )
  }
  return (
    <FormControl isInvalid={isError} width="50em">
      {question > 0 && (<FormLabel fontWeight={400}>Question {questionAnswerList[question].questionNumber}</FormLabel>)}
      <Spacer padding=".5em"/>
      <FormLabel>{formatQuestionText(questionAnswerList[question].question)}</FormLabel>
      {questionAnswerList[question].questionNumber === 10 && (
        <VStack>
          <Image src={whos_that_pokemon} height="300px"/>
          <Spacer padding="1em"/>
        </VStack>
      )}
      {question > 0 && (<Input type='email' value={input} onChange={handleInputChange} onKeyDown={handleKeyDown}/>)}
      <FormHelperText>{questionAnswerList[question].tips}</FormHelperText>
      {isError && (<FormErrorMessage>enter the right answer</FormErrorMessage>)}
      <Spacer padding="1em"/>
      {question === 0 && (<Button onClick={() => onSubmit()} backgroundColor="red.300" color="White">
        start
      </Button>)}
      {question > 0 && (<Button onClick={() => onSubmit()} backgroundColor="red.300" color="White">
        submit
      </Button>)}
    </FormControl>
  )
}
