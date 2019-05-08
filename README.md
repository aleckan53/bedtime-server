## Bedtime-server

Express app for [bedtime-client](https://github.com/olegakan/bedtime-client)
<div style='
  display: flex;
  justify-content: space-between;
'>
  <img src='https://d1.awsstatic.com/rdsImages/postgresql_logo.6de4615badd99412268bc6aa8fc958a0f403dd41.png' alt='postgresql' height='80'/>
  <img src='https://seeklogo.com/images/K/knexjs-logo-30104DC5C6-seeklogo.com.png' alt='knexjs' height='80'/>
  <img src='https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png' alt='nodejs' height='80'/>
  <img src='https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67' alt='expressjs'  height='80'/>
</div>

The app is a a platform where users can read kids stories and publish their owns.

### Teach Stack
<ul>
  <li>React</li>
  <li>Node</li>
  <li>Express</li>
  <li>PostgreSQl</li>
  <li>Knex</li>
  <li>JWT</li>
  <li>BcryptJS</li>
  <li>Mocha</li>
  <li>Chai</li>
  <li>Supertest</li>
  <li>Enzyme</li>
</ul>

### Data Models

#### Story Schema
```sh
  author TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  date_revised TIMESTAMP,
  rating DECIMAL DEFAULT 0.00,
  cover INTEGER REFERENCES images(id),
  status BOOLEAN DEFAULT false NOT NULL
```

#### User Schema
```sh
  user_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT now()
```

### API ENDPOINTS
All requests and responses are in JSON format.
<table>
  <thead style='background: rgba(0,0,100,.1'>
    <tr>
      <td>Action</td>
      <td>Path</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Authentication</td>
      <td>https://bedtime-server.herokuapp.com/api/auth</td>
    </tr>
    <tr>
      <td>Users</td>
      <td>https://bedtime-server.herokuapp.com/api/auth</td>
    </tr>
    <tr>
      <td>Stories</td>
      <td>https://bedtime-server.herokuapp.com/api/stories</td>
    </tr>
    <tr>
      <td>Image upload</td>
      <td>https://bedtime-server.herokuapp.com/api/uploads</td>
    </tr>
  </tbody>
</table>

#### Authentication
`POST` to `/login` endpoint for creation of JWT. It accepts the following request body,

```sh
{ user_name, password }
```

This endpoint takes in the username and verifies the password. When validated, the server will respond with a token,
```sh
{ authToken }
```

#### Users

`POST` to `*users/create `endpoint for a new user creation. It accepts the following req.body,
```sh
{
  user_name, // 4-20 charachters
  password, // 8-20 chars, at least 1 number
  first_name,
  last_name,
}
```

#### Stories
`GET` to `/stories` retruns a list of stories that has `status: true` (stories that are reviewed by admin), without content property.

`GET` to `/stories/:id` returns a story object with content (html elements). Authorization is required.

#### Image upload

`POST` to `/upload` for an image upload. Accepts image file within from data. Returns: 
```sh
{ id, link }
```


### Setting up
#### Client
```sh
git clone https://github.com/olegakan/bedtime-client.git
npm install
npm test
npm start
```
#### Server
```sh
git clone https://github.com/olegakan/bedtime-server.git
npm install
npm test
npm run dev
```

### Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Migrate database `npm run migrate`

Seed db `psql /DB_NAME/ < ./seeds/seed.tables.sql`

### Issues

Looking to contribute? Pick an issue from the [issues](https://github.com/olegakan/bedtime-server/issues) tab.

### Feature Requests

Please file an [issue](https://github.com/olegakan/bedtime-server/issues) to suggest new features. Vote by adding 👍 on feature request to help us prioritize what to work on.