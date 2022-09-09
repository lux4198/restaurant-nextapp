import db from '../../data/db.json' 

const fs = require('fs')

function saveData() {
    fs.writeFileSync('data/db.json', JSON.stringify(db, null, 4));
}

export default function handler(req, res){

    console.log(db)

    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.Name || !body.Email || !body.PeopleNum || !body.Date || !body.Time) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Name or Email not found' })
    }

    // save data to the database

    const reservation = { Name : body.Name, 
                            Email : body.Email,
                            PeopleNum : body.PeopleNum,
                            Time : body.Time,
                            Date : body.Date,
                        }

    db.push(reservation)
    saveData()

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json(reservation)
}