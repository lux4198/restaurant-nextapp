/* this api node processes requests for a specific reservation e.g. validation or changes / deletion */

import { findReservations, updateReservationById } from "../../../helpers/reservations-helpers"
import { connectToDatabase } from "../../../lib/mongodb"


// function returns hourly difference between two unix time stamps
function getHourDifference(time){
    const currentTime = new Date().getTime()

    return ((currentTime - time) / (1000 * 3600))
}


export default async function handler(req, res){
    const { db } = await connectToDatabase()
    const id = req.query.id
    const VALIDATIONID = req.query.valID

    // check database for entry with given ID

    const [reservation] = await findReservations(db, id)

    // if correct id is found return JSON object
    if(reservation._id.toString() === id){

         // if ID is found check for validation query and compare query id to id in database
    
        if ((req.query.validate === 'true')){

            // check for correct validationID

            if (reservation.VALIDATIONID === VALIDATIONID){

                // if validation link is not clicked within 24 hours validation is no longer possible

                if((getHourDifference(reservation.VALIDATIONTIME) < 24) && (getHourDifference(reservation.VALIDATIONTIME) > 0)){
                    updateReservationById(db, id, {...reservation, validated : true})
                    res.redirect(307, '/reservations/confirmation')
                }
                else{
                    res.send('Your confirmation link has expired, please make a new reservation.')
                }
            }

            else{
                res.send('Please provide correct validation id.')
            }
        }

        else{
            res.json(reservation)
        }


    }

    else{
        res.send('Please use appropriate method.')
    }
}