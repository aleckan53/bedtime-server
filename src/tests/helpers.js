module.exports = {
  cleanTables(db) {
    return db.raw(
      `TRUNCATE
        stories,
        images,
        users
        RESTART IDENTITY CASCADE;`
    )
  },
  seedTables(db, data) {
    return db.into('users').insert(data.users)
      .then(() => db.into('images').insert(data.images))
        .then(() => db.into('stories').insert(data.stories))
  }
}