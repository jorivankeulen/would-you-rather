import React, { Component} from 'react'
import {connect} from 'react-redux'
import User from './User'

class Leaderboard extends Component {
    render() {
        const { users } = this.props
        return (
            <div className="leaderboard">
                <h2>the wall of heroes</h2>
                <ul>
                    {users && users.map((id) => (
                        <User key={id} id={id} />             
                    ))}
                </ul>

            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    const sortedUsers = Object.keys(users).sort(function(a,b){
        return (Object.keys(users[b].answers).length + Object.keys(users[b].questions).length) - (Object.keys(users[a].answers).length + Object.keys(users[a].questions).length)
        })

    return {
        users: sortedUsers,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)