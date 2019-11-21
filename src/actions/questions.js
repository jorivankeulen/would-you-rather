import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    console.log(question)
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOne,optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        return saveQuestion({
            optionOneText: optionOne, 
            optionTwoText: optionTwo, 
            author: authedUser})
            .then((question) => dispatch(addQuestion(question)))
            .catch((e) => console.log(e))
    }
}

export function answerQuestion ({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAnswerQuestion(info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestionAnswer(info)
            .then(() => dispatch(answerQuestion(info)))
            .then(() => dispatch(hideLoading()))
    }
}