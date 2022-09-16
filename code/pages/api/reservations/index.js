import db from '../../../data/db.json' 
import { create } from '../../../helpers/reservations-helpers'

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

export default async function getResIDs(req, res){
    const data = db

    if (req.method === 'POST'){
        // Get data submitted in request's body.
        const body = req.body

        // Optional logging to see the responses
        // in the command line where next.js app is running.
        console.log('body: ', body)

        // Guard clause checks completness of entered data,
        // and returns early if they are not found
        if (!body.Name || !body.Email || !body.PeopleNum || !body.Date || !body.Time) {
            // Sends a HTTP bad request error code
            return res.status(400).json({ data: 'Name or Email not found' })
        }

        // check for hash code; this ensures that api requests are only made through 
        // the front end which uses the correct hash function and not by 3. parties

        else if (body.hash !== body.Name.concat('', body.Email).createHash()){
            res.send('Failed to process reservation.')
            return
        }

        // save data to the database

        const reservation = {   ID : Math.random().toString(16).slice(2),
                                Name : body.Name, 
                                Email : body.Email,
                                PeopleNum : body.PeopleNum,
                                ReservationTime : body.Time,
                                ReservationDate : body.Date,
                                validated : false, 
                                VALIDATIONID : Math.random().toString(16).slice(2).concat('', Math.random().toString(16).slice(2)),
                                VALIDATIONTIME : new Date().getTime()
                            }

        // console.log(reservation)
        create(reservation)

        // Found the name.
        // Sends a HTTP success code
        res.status(200).send('Reservation made.')
        
        console.log('POST request to api/reservations')

        // send mail containing confirmation link

        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSON.stringify(reservation),
            }

        const response = await fetch(`http://localhost:3000/api/reservations/mail`, options)
        const result = await response.text()
        console.log('response', result)
    }

    else {
        res.status(405).send({ message: 'Please use an appropriate HTTP method.' })
    }
}
