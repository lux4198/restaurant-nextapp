/* this page lets the user make a reservation which is processed in the corresponding api node */

import React, { useState } from 'react'
import styles from '../../styles/Reservations.module.css'

import iconMinus from '/public/static/images/icons/icon-minus.svg'

String.prototype.createHash = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function Reservations() {
    const [people, setPeople] = useState(4)

    const handleSubmit = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            Name: event.target.Name.value,
            Email: event.target.Email.value,
            PeopleNum: event.target.PeopleNum.value,
            Date: event.target.Date.value,
            Time: event.target.Time.value,
            hash : event.target.Name.value.concat('', event.target.Email.value).createHash()
        }

        console.log(data)

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/reservations/'

        // Form the request for sending data to the server.
        const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
        const result = await response.text()

        // console.log(result)
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        // const result = await response.json()
        
        // window.location.replace("/")
    }
    return (
        <div className= {styles.pageWrapper}>
            <div className={styles.background}/>
            <div className= {styles.heroWrap}>
                <div className= {styles.heroTextWrap}>
                    <h1>Reservations</h1>
                    <p>We can’t wait to host you. If you have any special requirements please feel free to call on the phone number below. We’ll be happy to accommodate you.</p>
                </div>
                <div className= {styles.formCard}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor ="Name">Name:</label>
                        <input type = "text" id = "Name" name = "Name"
                                placeholder='Name'/>
                        
                        <label htmlFor ="Email">Email:</label>
                        <input type = "text" id = "Email" name = "Email"
                                placeholder='Email'/>
                        
                        <div className= {styles.dateTimeWrap}>
                            <label className = {styles.show} htmlFor ="Date">Pick A Date</label>
                            <input type = "date" id = "Date" name = "Date"/>
                        </div>
                        <div className= {styles.dateTimeWrap}>
                            <label className = {styles.show} htmlFor ="Time">Pick A Time</label>
                            <input type = "time" id = "Time" name = "Time"/>
                        </div>
                        
                        <label htmlFor ="PeopleNum">People:</label>
                        {/* <input type = "number" id = "PeopleNum" name = "PeopleNum"
                                placeholder='People'/> */}

                        <div className = {styles.peopleInput}>
                            <div className= {styles.buttonLeft} onClick= {() => setPeople((people > 1)? people - 1 : people)}>
                                <img src = {'static/images/icons/icon-minus.svg'} alt = 'iconMinus'/>
                            </div>
                                <input type = "text" id = "PeopleNum" name = "PeopleNum"  defaultValue= {(people > 1)? `${people} People` : `${people} Person`}/>
                            <div className= {styles.buttonRight}  onClick= {() => setPeople((people < 10)? people + 1 : people)}>
                                <img src = {'static/images/icons/icon-plus.svg'} alt = 'iconPlus'/>
                            </div>
                        </div> 

                        <button type="submit">MAKE RESERVATION</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reservations
