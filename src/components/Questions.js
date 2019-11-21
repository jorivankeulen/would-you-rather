import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Questions extends Component {
    render() {
        const { questionsIds, authedUser } = this.props
        // console.log(this.props)

        let answeredQuestions = []
        let unansweredQuestions = []

        if(authedUser) { 
            answeredQuestions = Object.keys(authedUser.answers).filter(q => true)
        }
        unansweredQuestions = questionsIds.filter(
            q => !answeredQuestions.includes(q))

        return (
            <div>
                {unansweredQuestions.length !== 0 && 
                    <h3><hr/>Are you ready to answer some new questions?</h3>}
                {unansweredQuestions.map((id) => (
                    <Question id={id} />
                ))}
            
                {answeredQuestions.length !== 0 && 
                    <h3><hr/>Here are the questions you've already answered:</h3>}
                {answeredQuestions.map((id) => (
                    <Question id={id} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {

    const authedUserObj = users[authedUser]

    return { 
        questionsIds: Object.keys(questions) 
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser: authedUserObj
    }
}

export default connect(mapStateToProps)(Questions)