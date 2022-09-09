import React from 'react'
import db from '../../data/db.json'

function Reservations() {

    return (
        <div>
            {db.map((reservation) => {
                return(
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>People</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{reservation.Name}</td>
                                <td>{reservation.Email}</td>
                                <td>{reservation.Date}</td>
                                <td>{reservation.Time}</td>
                                <td>{reservation.PeopleNum}</td>
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
