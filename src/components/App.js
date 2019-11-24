import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Questions from './Questions'
import QuestionDetails from './QuestionDetails'
import AddQuestion from './AddQuestion'
import Nav from './Nav'
import Login from './Login'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loggedOut === true
              ? <Login />
              : <div>
                  <Nav />
                  <Route path='/' exact component={Questions} />
                  <Route path='/question/:id' component={QuestionDetails} />
                  <Route path='/add' component={AddQuestion} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </div>
              }
          </div>
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    loggedOut: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
