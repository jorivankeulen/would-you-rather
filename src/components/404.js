import React from 'react'
import { NavLink } from 'react-router-dom'

const FourOhFour = () => {
    return (
        <div className="four-oh-four">
            <h2>I'm so sorry, this page does not exist :'(</h2>
            <NavLink to='/' exact className="four-oh-four__btn" activeClassName='active'>
                back 2 home
            </NavLink>
        </div>
    )
}

export default FourOhFour