import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Questions from './Questions'
import AddQuestion from './AddQuestion'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    // const id = '8xf0y6ziyjabvozdd253nd'
    return (
      <div>
        <LoadingBar />
        Would you rather?
        <AddQuestion />
        <Questions />
      </div>
    )
  }
}


// function mapStateToProps({ users, authedUser }) {
//   const authedUserObj = users[authedUser]
//   console.log(authedUserObj)
// }
export default connect()(App);
