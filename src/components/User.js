import React, { Component } from 'react'
import { connect } from 'react-redux' 

class User extends Component {
    render() {
        const { user } = this.props
        const nAnswers = Object.keys(user.answers).length
        const nQuestions = Object.keys(user.questions).length
        return (
            <li key={user.id} className="leaderboard__user">
                <div className="avatar">
                    <img src={user.avatarURL} alt="" />
                    <span className="score">{nAnswers+nQuestions}</span>
                </div>
                {`${user.id} has answered ${nAnswers} questions and asked ${nQuestions} questions.`}
            </li>
        )    
    }
}

function mapStateToProps({users}, {id}) {
    const user = users[id]
    return {
        user
    }
}

export default connect(mapStateToProps)(User)