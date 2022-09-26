import React from 'react'
import styles from './Footer.module.css'

function Footer() {
    return (
        <div className= {styles.footerWrap}>
            <div className= {styles.logo}>
                <img src = '/static/images/logo.svg' alt = 'Logo' />
            </div>
            <div className= {styles.adress}>
                <p>Marthwaite, Sedbergh</p>
                <p>Cumbria</p>
                <p>+00 44 123 4567</p>
            </div>
            <div className= {styles.openTimes}>
                <p>Open Times</p>
                <p>MON - FRI: 09:00 AM - 10:00 PM</p>
                <p>SAT - SUN: 09:00 AM - 11:30 PM</p>
            </div>
        </div>
    )
}

export default Footer
