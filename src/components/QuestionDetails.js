import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
    
    handleAnswer = (e, answer) => {
        e.preventDefault()
        
        const { id } = this.props.match.params
        const { dispatch, authedUser } = this.props
        
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

        const { author, optionOne, optionTwo } = question
        
        return (
            <div>
                <h3>{author} was wondering, would you rather:</h3>
                <button onClick={(e) => this.handleAnswer(e, "optionOne")}>{optionOne.text}?</button>
                <p>or..</p>
                <button onClick={(e) => this.handleAnswer(e, "optionTwo")}>{optionTwo.text}?</button>

            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const { id } = props.match.params
    const question = questions[id]

    return {
        authedUser,
        question: question
    }
}

export default connect(mapStateToProps)(Question)