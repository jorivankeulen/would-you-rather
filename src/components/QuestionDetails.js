import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

class Question extends Component {
    
    handleAnswer = (e, answer) => {
        e.preventDefault()
        
        const { id } = this.props.match.params
        const { dispatch, authedUser } = this.props
        
        dispatch(handleAnswerQuestion({
            authedUser: authedUser.id,
            qid: id,
            answer
        }))
    }

    render() {
        const { id, authedUser, question, users } = this.props

        if (question == null ) {
            return <p>This question does not exist</p>
        }

        const { author, optionOne, optionTwo } = question
        
        const votersOptionTwo = Object.filter(users, u => u.answers[id] === 'optionTwo')
        const votersOptionOne = Object.filter(users, u => u.answers[id] === 'optionOne')
        
        return (
            <div className="question-details">
                <h3>{author} was wondering, would you rather:</h3>
                <div className="wrapper">
                    <div className="question-details__vote-box">
                        <h4>{optionOne.text}?</h4>
                        <h4 className="score">
                            {Object.keys(votersOptionOne).length} votes
                        </h4>
                        <button 
                            onClick={(e) => this.handleAnswer(e, "optionOne")}
                            className={Object.keys(authedUser.answers).includes(id) ? 'voted' : ''}
                            // disabled={Object.keys(authedUser.answers).includes(id)}
                            >
                            {!Object.keys(authedUser.answers).includes(id)
                                ? `Vote`
                                : Object.keys(votersOptionOne).includes(authedUser.id) 
                                    ? `You voted for this`
                                    : `Already voted`
                            }
                        </button>
                        <h4>Voted for by:</h4>
                        <ul className="question-details__vote-box__voters">
                            {Object.keys(votersOptionOne).map(v => <li>{v}</li>)}
                        </ul>
                    </div>
                    <div className="question-details__vote-box__spacer">
                        <h5>..or..</h5>
                    </div>
                    <div className="question-details__vote-box">
                        <h4>{optionTwo.text}?</h4>
                        <h4 className="score">
                            {Object.keys(votersOptionTwo).length} votes
                        </h4>
                        <button 
                            onClick={(e) => this.handleAnswer(e, "optionTwo")}
                            className={Object.keys(authedUser.answers).includes(id) ? 'voted' : ''}
                            // disabled={Object.keys(authedUser.answers).includes(id)}
                            >
                            {!Object.keys(authedUser.answers).includes(id)
                                ? `Vote`
                                : Object.keys(votersOptionTwo).includes(authedUser.id) 
                                    ? `You voted for this`
                                    : `Already voted`
                            }
                        </button>
                        <h4>Voted for by:</h4>
                        <ul className="question-details__vote-box__voters">
                            {Object.keys(votersOptionTwo).map(v => <li>{v}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const { id } = props.match.params
    const question = questions[id]
    const authedUserObj = users[authedUser]
    return {
        id,
        authedUser: authedUserObj,
        question: question,
        users
    }
}

export default connect(mapStateToProps)(Question)