import React, { Component } from 'react'
import { connect } from 'react-redux' 

class User extends Component {
    render() {
        const { user } = this.props
        const nAnswers = Object.keys(user.answers).length
        return (
            <li>
                <img src={user.avatarURL} alt="" />
                {`${user.id} has answered ${nAnswers} question.`}
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