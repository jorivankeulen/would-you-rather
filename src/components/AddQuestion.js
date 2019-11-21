import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo:''
    }

    handleChange = (e, answer) => {
        const text = e.target.value
        this.setState(() => ({
            [answer]: text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne,optionTwo))

    }

    render() {
        const { optionOne, optionTwo } = this.state
        return (
            <div>
                <h3>Would they rather...?</h3>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        value={optionOne} 
                        onChange={(e) => this.handleChange(e, 'optionOne')} />
                    <p>or..</p>
                    <input 
                        type="text" 
                        value={optionTwo} 
                        onChange={(e) => this.handleChange(e, 'optionTwo')} />
                    <button 
                        type="submit" 
                        disabled={optionOne === '' || optionTwo === ''}>
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(AddQuestion)