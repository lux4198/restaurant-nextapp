import { insertReservation } from '../../../helpers/reservations-helpers'
import { connectToDatabase } from '../../../lib/mongodb.js'

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const { db } = await connectToDatabase();

    if (req.method === 'POST'){

        console.log('POST request to api/reservations')

        // Get data submitted in request's body.
        const body = req.body

        // Optional logging to see the responses
        // in the command line where next.js app is running.
        // console.log('body: ', body)

        // Guard clause checks completeness of entered data and returns early if they are not found
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

        const reservation = {   
                                ID : Math.random().toString(16).slice(2),
                                Name : body.Name, 
                                Email : body.Email,
                                PeopleNum : body.PeopleNum,
                                ReservationTime : body.Time,
                                ReservationDate : body.Date,
                                validated : false, 
                                VALIDATIONID : Math.random().toString(16).slice(2).concat('', Math.random().toString(16).slice(2)),
                                VALIDATIONTIME : new Date().getTime()
                            }

        // make POST request to database 
        const POSTresult = await insertReservation(db, reservation)

        // send mail containing confirmation link

        const message = `
            Dear ${POSTresult.Name}, rn
            rn
            Thanks for making a reservation with us! Please confirm your Reservation Details below. rn
            rn
            Date: ${POSTresult.ReservationDate} rn
            Time: ${POSTresult.ReservationTime} rn
            People: ${POSTresult.PeopleNum} rn
            Confirm Reservation: rn
            http://localhost:3000/api/reservations/${POSTresult._id}?valID=${POSTresult.VALIDATIONID}&validate=true

            `;
    
        // mail.send({
        //     to: POSTresult.Email,
        //     from: 'reservations@em5137.compounder.dev',
        //     subject: 'Reservation Confirmation',
        //     text: message,
        //     html: message.replace(/rn/g, '<br>'),
        //     }).then(() => {
        //         res.status(200).json({ status: 'Ok' });
        //     });
        }

    else {
        res.status(405).send({ message: 'Please use an appropriate HTTP method.' })
    }
}
