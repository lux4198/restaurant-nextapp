/* this file contains functions which interact with the database */

var ObjectId = require('mongodb').ObjectID;

// POST
export async function insertReservation(db, reservation) {
  console.log(reservation)
  // const reservation = { title, content, image, tags, creatorId, createdAt: new Date()};
  const { insertedId } = await db.collection('reservations').insertOne(reservation);
  reservation._id = insertedId;
  return reservation;
}

// db.collection.insertOne(): insert a single document into a collection
// GET
export async function findReservations(db, id) {

  // GET object by objectID

  return db.collection('reservations').find(ObjectId(id)).toArray()

  // GET all

  // return db
  //   .collection('reservations')
  //   .aggregate([
  //     { $sort: { _id: 1 } }, // if change to -1, will sort in asc order
  //   ])
  //   .toArray();
}

// PATCH
export async function updateReservationById(db, id, { ID, Name, Email, PeopleNum, ReservationTime, ReservationDate, validated, VALIDATIONID, VALIDATIONTIME }) {
  const reservation = { ID, Name, Email, PeopleNum, ReservationTime, ReservationDate, validated, VALIDATIONID, VALIDATIONTIME };
  return db
    .collection('reservations')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: reservation }) // replaces the value of a field with the specified value
}

// db.collection.findOneAndUpdate(filter, update, options): updates a single document based on the filter and sort criteria
// DELETE
export async function deleteReservationById(db, _id) {
  return db
    .collection('reservations')
    .deleteOne(
      { _id: new ObjectId(_id) })
}
// db.collection.deleteOne(): removes a single document from a collection