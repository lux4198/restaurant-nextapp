// this api node is responsible for sending out an email containing a confirmation link after a reservation had been made

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function getResID(req, res){
    
    const body = req.body

    const message = `
        Dear ${body.Name}, rn
        rn
        Thanks for making a reservation with us! Please confirm your Reservation Details below. rn
        rn
        Date: ${body.Date} rn
        Time: ${body.Time} rn
        People: ${body.PeopleNum} rn
        Confirm Reservation: rn
        http://localhost:3000/api/reservations/${body.ID}?validate=true

        `;
    
    // mail.send({
    //     to: body.Email,
    //     from: 'reservations@em5137.compounder.dev',
    //     subject: 'Reservation Confirmation',
    //     text: message,
    //     html: message.replace(/rn/g, '<br>'),
    //     }).then(() => {
    //         res.status(200).json({ status: 'Ok' });
    //       });
}