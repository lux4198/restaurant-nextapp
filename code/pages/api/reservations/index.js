import db from '../../../data/db.json' 
import { create } from '../../../helpers/reservations-helpers'


export default function getResIDs(req, res){
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

        // save data to the database

        const reservation = {   ID : Math.random().toString(16).slice(2),
                                Name : body.Name, 
                                Email : body.Email,
                                PeopleNum : body.PeopleNum,
                                Time : body.Time,
                                Date : body.Date,
                                validated : false, 
                            }

        create(reservation)

        // Found the name.
        // Sends a HTTP success code
        res.status(200).json(reservation)
        
        console.log('POST request to api/reservations')
    }

    else if (req.method === 'GET'){
        console.log('GET request to api/reservations')
        res.status(200).json(data)
    }

    else {
        res.status(405).send({ message: 'Please use appropriate HTTP method.' })
    }
}
