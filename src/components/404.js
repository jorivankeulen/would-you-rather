import React from 'react'
import { NavLink } from 'react-router-dom'

const FourOhFour = () => {
    return (
        <div className="404">
            <h2>I'm so sorry, this page does not exist :(</h2>
            <NavLink to='/' exact activeClassName='active'>
                Click here to go back home.
            </NavLink>
        </div>
    )
}

export default FourOhFour