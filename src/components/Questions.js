import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Questions extends Component {
    
    state = {
        filter: "unanswered"
    }

    setFilter = (filter) => {
        this.setState(() => ({
            filter: filter
        }))
    }

    render() {
        const { questionsIds, authedUser } = this.props
        const { filter } = this.state

        let answeredQuestions = []
        let unansweredQuestions = []

        if(authedUser) { 
            answeredQuestions = Object.keys(authedUser.answers).filter(q => true)
        }
        unansweredQuestions = questionsIds.filter(
            q => !answeredQuestions.includes(q))

        return (
            <div className="questions">
                <div className="filter">
                    <span 
                        className={filter === "unanswered"
                            ? "filter__btn filter__btn--selected"
                            : "filter__btn" }
                        onClick={() => this.setFilter('unanswered')}>
                        Unanswered
                    </span>
                    <span 
                        className={filter === "answered"
                            ? "filter__btn filter__btn--selected"
                            : "filter__btn" }
                        onClick={() => this.setFilter('answered')}>
                        Answered
                    </span>
                </div>
                {filter === "unanswered" && unansweredQuestions.length !== 0 && 
                    <h3>Are you ready to answer some new questions?</h3>}
                {filter === "unanswered" && unansweredQuestions.map((id) => (
                    <Question id={id} />
                ))}
            
                {filter === "answered" && answeredQuestions.length !== 0 && 
                    <h3>Here are the questions you've already answered:</h3>}
                {filter === "answered" && answeredQuestions.map((id) => (
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