import React, { Component} from 'react'
import {connect} from 'react-redux'
import User from './User'

class Leaderboard extends Component {
    render() {
        console.log(this.props)
        const { users } = this.props
        return (
            <div>
                <ul>
                    {users && users.map((id) => (
                        <User id={id} />             
                    ))}
                </ul>

            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    const sortedUsers = Object.keys(users).sort(function(a,b){
        return Object.keys(users[b].answers).length - Object.keys(users[a].answers).length
        })

    return {
        users: sortedUsers,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)