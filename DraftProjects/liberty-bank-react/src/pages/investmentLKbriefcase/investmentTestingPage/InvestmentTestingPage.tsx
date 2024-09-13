import React, { useState } from 'react';
import { RESULT_MESSAGE, test } from './consts';
import { Button, Checkbox, Image, PATH_PAGE, RadioButton, Text } from '@/shared';
import styles from './InvestmentTestinPage.module.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface Question {
  question: string;
  choices: string[];
  type: 'radio' | 'checkbox';
  correctAnswer: string[];
}

interface Result {
  correctAnswers: number;
  wrongAnswers: number;
}

const InvestmentTestinPage: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuestionDone, setIsQuestionDone] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { setIsTestSuccess } = useOutletContext<{
    setIsTestSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  const navigate = useNavigate();

  const { questions } = test;
  const { question, choices, correctAnswer, type } = questions[activeQuestion] as Question;

  const onFinishQuestion = (): void => {
    setResult((prev) => {
      let isAnswersCorrect = false;
      if (type === 'checkbox') {
        const correctIndexes = correctAnswer.map((answer) => choices.indexOf(answer));
        const selectedSorted = selectedAnswers.sort();

        isAnswersCorrect =
          selectedSorted.length === correctIndexes.length &&
          selectedSorted.every((answerIndex, index) => answerIndex === correctIndexes[index]);
        setIsCorrect(isAnswersCorrect);
      } else {
        const correctIndex = choices.indexOf(correctAnswer[0]);
        isAnswersCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === correctIndex;
        setIsCorrect(isAnswersCorrect);
      }
      setQuestionResults(selectedAnswers.sort());

      return {
        ...prev,
        correctAnswers: isAnswersCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: isAnswersCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
      };
    });
    setIsQuestionDone(true);
  };

  const resetData = (): void => {
    setSelectedAnswers([]);
    setIsQuestionDone(false);
    setQuestionResults([]);
    setResult({
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setShowResult(false);
  };

  const onClickNext = (): void => {
    setSelectedAnswers([]);
    setIsQuestionDone(false);
    setQuestionResults([]);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onFinishTest = (wrongNum: number): void => {
    if (wrongNum <= 1) {
      setIsTestSuccess(true);
    }
    resetData();
  };

  const onAnswerSelected = (answerIndex: number): void => {
    if (type === 'checkbox') {
      setSelectedAnswers((prevSelected) => {
        const index = prevSelected.indexOf(answerIndex);
        if (index > -1) {
          return prevSelected.filter((item) => item !== answerIndex);
        } else {
          return [...prevSelected, answerIndex];
        }
      });
    } else {
      setSelectedAnswers([answerIndex]);
    }
  };

  return (
    <div>
      {!showResult ? (
        <div className={styles.test_container}>
          <div className={styles.header_container}>
            <Text tag='h3' weight='bold'>
              Вопрос {activeQuestion + 1} из {questions.length}
            </Text>
            <Text tag='h4' weight='bold'>
              {question}
            </Text>
          </div>
          <ul className={styles.question_container}>
            {choices.map((answer, index) => {
              let answerTextClass = '';
              let answerContainerClass = '';
              if (isQuestionDone && questionResults?.includes(index)) {
                answerTextClass = correctAnswer.includes(answer)
                  ? styles.correct_answer
                  : styles.wrong_answer;
                answerContainerClass = correctAnswer.includes(answer)
                  ? styles.success_background
                  : styles.fail_background;
              }
              return (
                <li
                  key={index}
                  className={`${styles.question_item} ${isQuestionDone && answerContainerClass}`}
                >
                  {type === 'checkbox' ? (
                    <Checkbox
                      name={answer}
                      checked={selectedAnswers.includes(index)}
                      onChange={() => onAnswerSelected(index)}
                    />
                  ) : (
                    <RadioButton
                      name={answer}
                      value={answer}
                      width={'auto'}
                      transparent={true}
                      checked={selectedAnswers[0] === index}
                      onChange={() => onAnswerSelected(index)}
                    />
                  )}
                  <Text tag='h4' weight='medium' className={answerTextClass}>
                    {answer}
                  </Text>
                </li>
              );
            })}
            {isQuestionDone && !isCorrect && (
              <div className={styles.hint}>
                <Text tag='h4' weight='medium' className={styles.wrong_answer}>
                  Текст подсказки
                </Text>
              </div>
            )}
          </ul>
          <div className={styles.button_container}>
            <Button onClick={() => navigate(PATH_PAGE.investmentLK.start)} theme='secondary'>
              Отменить тест
            </Button>
            {isQuestionDone ? (
              <Button onClick={onClickNext} disabled={selectedAnswers.length === 0}>
                {activeQuestion === questions.length - 1
                  ? 'Показать результат'
                  : 'Следующий вопрос'}
              </Button>
            ) : (
              <Button onClick={onFinishQuestion} disabled={selectedAnswers.length === 0}>
                Ответить
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.main_container}>
          <div className={styles.result_container}>
            <div className={styles.results}>
              {result.wrongAnswers > 1 ? (
                <Image image='close-bill' height='150px' width='250px' />
              ) : (
                <Image image='brokerImage' height='175px' width='250px' />
              )}
              <div className={styles.header_container}>
                <Text
                  tag='h1'
                  weight='bold'
                  className={result.wrongAnswers > 1 ? styles.wrong_answer : styles.success_text}
                >
                  {result.correctAnswers} из {questions.length}
                </Text>
                <Text tag='h3' weight='bold'>
                  {result.wrongAnswers > 1 ? RESULT_MESSAGE.fail.main : RESULT_MESSAGE.success.main}
                </Text>
                <Text tag='h4' weight='regular' className={styles.message}>
                  {result.wrongAnswers > 1
                    ? RESULT_MESSAGE.fail.second
                    : RESULT_MESSAGE.success.second}
                </Text>
              </div>

              {result.wrongAnswers > 1 ? (
                <div className={styles.button_container_result}>
                  <Button onClick={() => resetData()} href={PATH_PAGE.investmentLK.education.start}>
                    Перейти к обучению
                  </Button>
                  <Button onClick={resetData} theme='secondary'>
                    Пройти заново
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => onFinishTest(result.wrongAnswers)}
                  href={PATH_PAGE.investmentLK.briefcase.start}
                >
                  Закончить тест
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentTestinPage;

// ${isQuestionDone ? styles.slide_out : ''}`
