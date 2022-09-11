/* this page is generated for every reservation ID and returns the corresponding reservation data */

import db from '../../data/db.json'


export async function getStaticPaths(){
    // const res = await fetch('http://localhost:3000/api/reservations/?method=GET')
    // const reservations = await res.json()

    const reservations = db

    const IDs = reservations.map(reservation => reservation.ID)
    
    const paths = IDs.map((ID) => (
        { params : { id : ID}}
    ))

    // console.log(paths)

    return {
        paths, 
        fallback : false
    }

}

export async function getStaticProps(context){
    const data = db
    const id = context.params.id

    // const res = await fetch(`http://localhost:3000/api/reservations/${id}`)
    // const reservation = await res.json()

    const reservationList = data.filter( (reservation) => {
        if (reservation.ID === id){
            return reservation  
        }
    })
    const reservation = reservationList[0]

    return {
        props : {
            // reservation : JSON.parse(reservation), 
            reservation : reservation
        }, 
        revalidate : 10, 
    }

}

export default function idPage(props){
    const reservation = props.reservation

    // console.log(props.reservation)
    return(
        <div>
            <h1>hello {reservation.Name}</h1>
            <button><a href= {`http://localhost:3000/api/reservations/${reservation.ID}?validate=true`}>VALIDATE</a></button>
        </div>
    )

}