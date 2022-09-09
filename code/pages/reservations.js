import React from 'react'
import styles from '../styles/Reservations.module.css'
import db from '../data/db.json'

function Reservations() {
    const handleSubmit = async (event) => {
        console.log(db)
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
        Name: event.target.Name.value,
        Email: event.target.Email.value,
        PeopleNum: event.target.PeopleNum.value,
        Date: event.target.Date.value,
        Time: event.target.Time.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/reservations_form'

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

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        console.log(result)
        // window.location.replace("/")
    }
    return (
        <div className= {styles.wrapper}>
            <h1>Reservations</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor ="Name">Name:</label>
                <input type = "text" id = "Name" name = "Name"/>
                <br/>
                <label htmlFor ="Email">Email:</label>
                <input type = "text" id = "Email" name = "Email"/>
                <br/>
                <label htmlFor ="Date">Date:</label>
                <input type = "date" id = "Date" name = "Date"/>
                <br/>
                <label htmlFor ="Time">Time:</label>
                <input type = "time" id = "Time" name = "Time"/>
                <br/>
                <label htmlFor ="PeopleNum">PeopleNum:</label>
                <input type = "number" id = "PeopleNum" name = "PeopleNum"/>
                <br/>

                <button type="submit">MAKE RESERVATION</button>
            </form>
        </div>
    )
}

export default Reservations
