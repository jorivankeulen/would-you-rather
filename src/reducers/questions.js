import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION :
            const { authedUser, qid, answer } = action
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        case ADD_QUESTION :
            console.log(action)
            return {
                ...state,
                [action.question.id]: action.question,
            }
        default :
            return state
    }
}