import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = (obj[key], res)), {} );

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
            return <Redirect to='/404' />
        }

        const { author, optionOne, optionTwo } = question
        
        const votersOptionTwo = Object.filter(users, u => u.answers[id] === 'optionTwo')
        const votersOptionOne = Object.filter(users, u => u.answers[id] === 'optionOne')
        const totalVotes = Object.keys(votersOptionOne).length + Object.keys(votersOptionTwo).length

        const precentageOptionOne = totalVotes > 0 ? Math.round((Object.keys(votersOptionOne).length / totalVotes)*100) : 0;
        const precentageOptionTwo = totalVotes > 0 ? Math.round((Object.keys(votersOptionTwo).length / totalVotes)*100) : 0;
        
        return (
            <div className="question-details">
                <div className="question-details__author">
                    <img src={users[author].avatarURL} alt="" />
                    <h3>{author} was wondering, would you rather:</h3>
                </div>
                
                <div className="wrapper">

                    <div className="question-details__vote-box">
                        <h4>{optionOne.text}?</h4>
                        <h4 className="score">
                            {Object.keys(votersOptionOne).length}
                        </h4>
                        <h5>{`..out of ${totalVotes} votes (${precentageOptionOne}%)`}</h5>
                        <button 
                            onClick={(e) => this.handleAnswer(e, "optionOne")}
                            className={Object.keys(authedUser.answers).includes(id) ? 'voted' : ''}>
                            {!Object.keys(authedUser.answers).includes(id)
                                ? `Vote`
                                : Object.keys(votersOptionOne).includes(authedUser.id) 
                                    ? `You voted for this`
                                    : `Already voted`
                            }
                        </button>
                        <h4>Voted for by:</h4>
                        <ul className="question-details__vote-box__voters">
                            {Object.keys(votersOptionOne).map(v => <li key={v}>{v}</li>)}
                        </ul>
                    </div>

                    <div className="question-details__vote-box__spacer">
                        <h5>..or..</h5>
                    </div>

                    <div className="question-details__vote-box">
                        <h4>{optionTwo.text}?</h4>
                        <h4 className="score">
                            {Object.keys(votersOptionTwo).length} 
                        </h4>
                        <h5>{`..out of ${totalVotes} votes (${precentageOptionTwo}%)`}</h5>
                        <button 
                            onClick={(e) => this.handleAnswer(e, "optionTwo")}
                            className={Object.keys(authedUser.answers).includes(id) ? 'voted' : ''}>
                            {!Object.keys(authedUser.answers).includes(id)
                                ? `Vote`
                                : Object.keys(votersOptionTwo).includes(authedUser.id) 
                                    ? `You voted for this`
                                    : `Already voted`
                            }
                        </button>
                        <h4>Voted for by:</h4>
                        <ul className="question-details__vote-box__voters">
                            {Object.keys(votersOptionTwo).map(v => <li key={v}>{v}</li>)}
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