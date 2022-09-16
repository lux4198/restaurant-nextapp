/* this api node processes requests for a specific reservation e.g. validation or changes / deletion */

import db from '../../../data/db.json' 
import { validate } from '../../../helpers/reservations-helpers';

function getHourDifference(time){
    const currentTime = new Date().getTime()

    return ((currentTime - time) / (1000 * 3600))
}


export default async function getResID(req, res){
    const data = db
    const id = req.query.id

    // check database for entry with given ID

    const reservationList = data.filter( (reservation) => {
        if (reservation.VALIDATIONID === id){
            return reservation  
        }
    })

    const reservation = reservationList[0]
    
    // guard clause if ID is not found send 404

    if (reservation === undefined){
        res.send('ID doesnt exist')
    }

    // if ID is found check for validation query and compare query id to id in database
    
    else if ((req.query.validate === 'true') && reservation.VALIDATIONID === id){

        // if validation link is not clicked within 24 hours validation is no longer possible

        if((getHourDifference(reservation.VALIDATIONTIME) < 24) && (getHourDifference(reservation.VALIDATIONTIME) > 0)){
            validate(id)
            res.redirect(307, '/reservations/confirmation')
        }
        else{
            res.send('Your confirmation link has expired, please make a new reservation.')
        }
    }

    else{
        res.send('Please use appropriate method.')
    }
}