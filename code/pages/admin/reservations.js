/* this is the admin page that lists the reservations in the database */

import React from 'react'
import db from '../../data/db.json'

export async function getStaticProps(context){

    // const res = await fetch(`http://localhost:3000/api/reservations/?method=GET`)

    // const reservations = await res.json()

    const reservations = db

    return {
        props : {
            data : reservations, 
        }, 
    }

}

function Reservations(props) {
    const data = props.data

    return (
        <div>
            {data.map((reservation) => {
                return(
                    <table key = {reservation.ID}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>People</th>
                                <th>Validated</th>
                            </tr>
                            <tr>
                                <td>{reservation.ID}</td>
                                <td>{reservation.Name}</td>
                                <td>{reservation.Email}</td>
                                <td>{reservation.Date}</td>
                                <td>{reservation.Time}</td>
                                <td>{reservation.PeopleNum}</td>
                                <td>{`${reservation.validated}`}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            })
            }
        </div>
    )
}

export default Reservations
