import React, { useState } from 'react';
import { RESULT_MESSAGE, test, HINT, BUTTONS } from './constants';
import { BackButton, Button, Checkbox, RadioButton, Text } from '@/shared';
import styles from './testPage.module.scss';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTest } from '@/shared/api/investmentApi/educationSlice';
import { PATH_PAGE } from '@/shared/lib/reactRouter';
import classNames from 'classnames';

interface Question {
  question: string;
  choices: string[];
  type: 'radio' | 'checkbox' | 'info';
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

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const handleBackButton = (): void => {
    setIsQuestionDone(false);
    setQuestionResults([]);
    setResult((prev) => {
      const { choices, correctAnswer } = questions[activeQuestion - 1];
      const correctIndex = choices.indexOf(correctAnswer[0]);
      const bool = questionResults[0] == correctIndex;
      return {
        ...prev,
        correctAnswers: bool ? prev.correctAnswers - 1 : prev.correctAnswers,
        wrongAnswers: bool ? prev.wrongAnswers : prev.wrongAnswers - 1,
      };
    });
    if (activeQuestion > 1) {
      setActiveQuestion(activeQuestion - 1);
      setSelectedAnswers(questionResults);
    } else {
      setShowResult(false);
      setActiveQuestion(0);
    }
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
    setActiveQuestion(0);
  };

  const onClickNext = (): void => {
    setSelectedAnswers([]);
    setIsQuestionDone(false);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onFinishTest = (): void => {
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

  const handlerFail = (correctAnswers: number) => {
    resetData();
    dispatch(setTest({ courseId: id, test: { isDone: true, correctResults: correctAnswers } }));
    navigate(generatePath(PATH_PAGE.investmentLK.education.singleCourse, { id: String(id) }));
  };

  const handlerSuccess = (correctAnswers: number) => {
    onFinishTest();
    dispatch(setTest({ courseId: id, test: { isDone: true, correctResults: correctAnswers } }));
    navigate(generatePath(PATH_PAGE.investmentLK.education.start));
  };

  const handleBackButtonClick = () =>
    navigate(generatePath(PATH_PAGE.investmentLK.education.singleCourse, { id: String(id) }));

  return (
    <div>
      {!showResult ? (
        <div className={styles.test_container}>
          <BackButton
            text='Назад'
            theme='blue'
            name='arrow-left-blue'
            className={styles.backBtn}
            click={handleBackButtonClick}
          />
          <div className={styles.header_container}>
            <Text tag='h3' weight='bold'>
              Вопрос {activeQuestion} из {questions.length - 1}
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
                  {type === 'checkbox' && (
                    <Checkbox
                      name={answer}
                      checked={selectedAnswers.includes(index)}
                      onChange={() => onAnswerSelected(index)}
                    />
                  )}
                  {type === 'radio' && (
                    <RadioButton
                      name={answer}
                      value={answer}
                      width={'auto'}
                      transparent={true}
                      checked={selectedAnswers[0] === index}
                      onChange={() => onAnswerSelected(index)}
                    />
                  )}
                  {type === 'info' && <span>&#8226;</span>}
                  <Text tag='h4' weight='medium' className={answerTextClass}>
                    {answer}
                  </Text>
                </li>
              );
            })}
            {isQuestionDone && !isCorrect && (
              <div className={styles.hint}>
                <Text tag='h4' weight='medium' className={styles.wrong_answer}>
                  {HINT}
                </Text>
              </div>
            )}
          </ul>
          <div
            className={classNames(
              styles.button_container,
              activeQuestion > 0 ? styles.button_container_between : styles.button_container_end,
            )}
          >
            {activeQuestion > 0 && (
              <Button onClick={handleBackButton} theme='secondary'>
                Назад
              </Button>
            )}
            {activeQuestion === 0 ? (
              <Button onClick={onClickNext}>Далее</Button>
            ) : isQuestionDone ? (
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
              <div className={styles.header_container}>
                <Text
                  tag='h1'
                  weight='bold'
                  className={result.wrongAnswers > 1 ? styles.wrong_answer : styles.correct_answer}
                >
                  {result.correctAnswers} из {questions.length - 1}
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
                  <Button onClick={() => handlerFail(result.correctAnswers)}>
                    {BUTTONS.lesson}
                  </Button>
                  <Button onClick={resetData} theme='secondary'>
                    {BUTTONS.test}
                  </Button>
                </div>
              ) : (
                <div className={styles.button_container_result}>
                  <Button onClick={() => handlerSuccess(result.correctAnswers)}>
                    {BUTTONS.course}
                  </Button>
                  <Button onClick={resetData} theme='secondary'>
                    {BUTTONS.test}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentTestinPage;
