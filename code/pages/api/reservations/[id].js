/* this api node processes requests for a specific reservation e.g. validation or changes / deletion */

import db from '../../../data/db.json' 
import { validate } from '../../../helpers/reservations-helpers';


export default async function getResID(req, res){
    const data = db
    const id = req.query.id

    if (req.query.validate === 'true'){
        validate(id)
        // res.json({'validation' : 'true'})
        res.redirect(307, '/reservations/confirmation')
        return
    }
    
    const reservationList = data.filter( (reservation) => {
        if (reservation.ID === id){
            return reservation  
        }
    })
    const reservation = reservationList[0]

    res.json(JSON.stringify(reservation))
}