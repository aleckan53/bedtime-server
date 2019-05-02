module.exports = {
  stories () {
    return [
      {
        author: 'John Doe',
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum',
        cover: 1,
        content: 'Lorem ipsum dolor',
      },
      {
        author: 'Jane Doe',
        name: 'Dolor Ipsum',
        description: 'Dolor Ipsum',
        cover: 2,
        content: 'Dolor ipsum dolor',
      },
      {
        author: 'Sam Doe',
        name: 'Amet Ipsum',
        description: 'Amet Ipsum',
        cover: 3,
        content: 'Amet ipsum dolor',
      }
    ]
  },
  users () {
    return [
      {
        user_name: 'johndoe',
        password: '$2a$04$5DS6X/TYcyMHqyoB3yAeyOjJx6ELQyT6G9DEFPeuOe4tp3YgYdDdm',
        email: 'test1@test.com',
        first_name: 'John',
        last_name: 'Doe'
      },
      {
        user_name: 'janesmith',
        password: '$2a$04$m63r3lAvpMB62cxH/YTiPOcVU8L5sUlPmmR.3qIX7Ro/YWmKKYjkC',
        email: 'test2@test.com',
        first_name: 'Jane',
        last_name: 'Smith'
      },
      {
        user_name: 'samsmith',
        password: '$2a$04$6u/FzBvuaDilXDwgNUGvgegP.dHdsg.TyKTqP1yP1MUNPFkkCnz86',
        email: 'test3@test.com',
        first_name: 'Sam',
        last_name: 'Smith'
      },
    ]
  },
  images () {
    return [
      { link: '[link]', alt: 'alt text1'},
      { link: '[link]', alt: 'alt text2'},
      { link: '[link]', alt: 'alt text3'},
      { link: '[link]', alt: 'alt text4'},
      { link: '[link]', alt: 'alt text5'},
      { link: '[link]', alt: 'alt text6'},
    ]
  }
}


// author, name, description, cover, content
//user_name, password, email, first_name, last_name