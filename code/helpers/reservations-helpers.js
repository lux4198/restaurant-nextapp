/* this file contains functions which interact with the database */

const fs = require('fs');

let db = require('../data/db.json')

export function create(reservation){
  console.log(reservation)
    db.push(reservation)
    saveData()
}

export function validate(reservationID){
    for (var i = 0; i < db.length; i++) {
        if (db[i].ID === reservationID) {
          db[i].validated = true;
          break;
        }
      }
    saveData()
}


function saveData() {
    fs.writeFileSync('data/db.json', JSON.stringify(db, null, 4));
}