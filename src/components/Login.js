import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    login = (user) => {
        const {dispatch} = this.props
        dispatch(setAuthedUser(user))
        console.log(user)

    }

    render() {
        const { users } = this.props
        console.log(this.props)
        console.log(users)
        return (
            <div>
                {Object.keys(users).map((user) => (
                    <button onClick={() => this.login(user)}>{user}</button>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)