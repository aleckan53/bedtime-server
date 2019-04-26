const xss = require('xss')

module.exports = {
  getStoriesList(knex) {
    // returns stories list with covers
    return knex('stories as s')
      .join('images as i', 's.cover', '=', 'i.id')
      .select('*')
      //'s.id', 's.author', 's.name', 's.date_published', 's.description', 's.rating'
  },
  getStoryById(knex, id) {
    return knex('stories as s')
      .where('s.id', id)
      .join('images as i', 's.cover', '=', 'i.id')
      .select('*')
      .first()
  },
  uploadStory(knex, story) {
    return knex('stories')
      .insert(story)
      .returning('*')
  },
  serializeData(data) {
    const serialized = Object.keys(data).reduce((acc, val) => {
      acc[val] = xss(data[val])
      return acc
    }, {})

    return serialized
  }
}