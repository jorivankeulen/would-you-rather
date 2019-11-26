import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import { Link } from 'react-router-dom'

class Question extends Component {
    
    handleAnswer = (e, answer) => {
        e.preventDefault()

        const { dispatch, id, authedUser } = this.props
        
        dispatch(handleAnswerQuestion({
            authedUser,
            qid: id,
            answer
        }))
    }

    render() {
        const { question } = this.props

        if (question == null ) {
            return <p>This question does not exist</p>
        }

        const { optionOne, optionTwo } = question
        
        return (
            <Link 
                to={`/question/${question.id}`}
                className="question">
                <h3>Would you rather..</h3>
                <p>{optionOne.text},<br/> 
                or {optionTwo.text}?</p>
            </Link>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, {id}) {

    const question = questions[id]

    return {
        authedUser,
        question: question
    }
}

export default connect(mapStateToProps)(Question)