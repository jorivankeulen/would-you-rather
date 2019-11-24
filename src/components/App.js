import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Questions from './Questions'
import Question from './Question'
import QuestionDetails from './QuestionDetails'
import AddQuestion from './AddQuestion'
import Nav from './Nav'
import Login from './Login'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    // const id = '8xf0y6ziyjabvozdd253nd'
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true
              ? <Login />
              : <div>
                  <Nav />
                  <Route path='/' exact component={Questions} />
                  <Route path='/question/:id' component={QuestionDetails} />
                  <Route path='/new' component={AddQuestion} />
                  {/* leaderboard */}
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
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
