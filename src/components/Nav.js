import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

class Nav extends Component {
  logout = () => {
    const {dispatch} = this.props
    dispatch(logout())
  }
  render() {
    const {authedUser} = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <button onClick={() => this.logout()}>
              Logout
            </button>
          </li>
          <li>
              {authedUser}
          </li>
        </ul>
      </nav>
    )

  }
} 

function mapStateToProps({authedUser}) {
  return {authedUser}
}
export default connect(mapStateToProps)(Nav)