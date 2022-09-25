import styles from './Button.module.css'

import React from 'react'

/* the default button component, note that props.dark refers to the background the button is on */

function Button(props) {
    return (
        <div className={styles.buttonWrap}>
            <button style = {props.style} 
                    className = {`${styles.buttonMain} ${props.dark? styles.buttonDark : styles.buttonLight}`}
                    type = {props.type}>
                {props.children}
            </button>
        </div>
    )
}

export default Button
