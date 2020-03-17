import React from "react";
import Icon from './Death-Star-icon.png'
import './error-indicator.css'

const ErrorIndicator = () => {
    return (
        <div className='error-indicator'>
            <img className='error-image' src={Icon} alt='eeror icon'/>
            <span className="boom">BOOM!!</span>
            <span>
                something has gone terribly wrong
            </span>
            <span>
                (but we already have sent droids to fix it)
            </span>
        </div>
    )
}

export default ErrorIndicator