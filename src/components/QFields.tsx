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
import Score from '../lib/pics/music_score.png'

type ChildProps = {
  updateToTest: () => void;
};

export const QFields: React.FC<ChildProps> = ({updateToTest}) => {
  const [input, setInput] = useState('')
  const [isError, setIsError] = useState(false)
  const [endMessage, setEndMessage] = useState(false)
  const [question, setQuestion] = useState(0)

  const questionAnswerList = [
    {
      questionNumber: 1,
      question: `wtf ARE YOU TENZ?!?!?!??!?!?!?!?!??!?!?!!?!?!?!?!??!?!?!?!?!?!??!?!?!!?!?!?!?!?!?!?!?!?
        If you are, then answer this:
        Who was the first agent you played when you went pro?
        AND
        What was your round score at the end of the match?`,
      answer: "jett13-8",
      tips: "combine your answer with no spaces... use '-' for the round score",
      message: "gimme your autograph pls"
    },
    {
      questionNumber: 2,
      question: `mb i didnt know you were THE glub
        as a fellow musician, you should be able to understand my super secret code word
        in this super secret music sheet
        follow the path to the end of the song`,
      answer: "badge",
      tips: "tip: just try it all",
      message: "that was some nerd shit that you just did"
    },
    {
      questionNumber: 3,
      question: `what does this say?
        아이 러우브 투 이트 피자
        `,
      answer: "i love to eat pizza",
      tips: "dont use google translate >:)",
      message: "hell yeah you do"
    }
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

  const onSubmit = () => {
    if (input.toLowerCase() !== questionAnswerList[question].answer) {
      setIsError(true)
    }
    else {
      setEndMessage(true)
    }
  }

  const onNext = () => {
    if (question < 2) {
      setQuestion(question + 1)
      setInput('')
      setIsError(false)
      setEndMessage(false)
    }
    else {
      setInput('')
      setIsError(false)
      setEndMessage(false)
      updateToTest()
    }
  }
  
  if (endMessage) {
    return (
      <VStack>
        <Text width="50em">{questionAnswerList[question].message}</Text>
        <Spacer padding="1em"/>
        <Button onClick={onNext} backgroundColor="red.300" color="White">
          next
        </Button>
      </VStack>
    )
  }
  return (
    <FormControl isInvalid={isError} width="50em">
      <FormLabel>{formatQuestionText(questionAnswerList[question].question)}</FormLabel>
      {questionAnswerList[question].questionNumber === 2 && (
        <VStack>
          <Image src={Score}/>
          <Spacer padding="1em"/>
        </VStack>
      )}
      <Input type='email' value={input} onChange={handleInputChange}/>
      <FormHelperText>{questionAnswerList[question].tips}</FormHelperText>
      {isError && (<FormErrorMessage>enter the right answer</FormErrorMessage>)}
      <Spacer padding="1em"/>
      <Button onClick={onSubmit} backgroundColor="red.300" color="White">
        submit
      </Button>
    </FormControl>
  )
}
