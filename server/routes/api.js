const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'project',
  database: 'MusicTunes'
})

client.connect()

router.post('/register', async (req, res) => {
  const pseudo = req.body.pseudo
  const email = req.body.email
  const password = req.body.password
  const hash = await bcrypt.hash(password, 10)

  const user = await client.query({
    text: "SELECT * FROM users WHERE email=$1 OR pseudo=$2",
    values: [email, pseudo]
  })

  if (user.rows.length != 0) {
    if (user.rows[0].email == email) {
      res.status(400).json({ message: 'Account already exists with that email' })
    }

    else if (user.rows[0].pseudo == pseudo) {
      res.status(400).json({ message: 'This pseudo is no more available' })
    }
  }

  else {
    await client.query({
      text: "INSERT INTO users (email, password, pseudo) VALUES ($1,$2,$3)",
      values: [email, hash, pseudo]
    })
    res.json("success")
  }
}),

  router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await client.query({
      text: "SELECT * FROM users WHERE email=$1",
      values: [email]
    })

    if (user.rows.length != 0) {
      if (await req.session.userId == user.rows[0].id) {
        res.status(401).json({ message: 'Already authentified' })
      }

      else {
        if (await bcrypt.compare(password, user.rows[0].password)) {
          req.session.userId = user.rows[0].id
          res.json("Welcome back " + user.rows[0].pseudo)
        }

        else {
          res.json("Wrong password")
        }
      }
    }

    else {
      res.status(404).json('Account does not exist')
    }
  }),

  router.get('/me', async (req, res) => {
    if (typeof req.session.userId === 'undefined') {
      res.status(401).json({ message: 'not connected' })
      return
    }

    const result = await client.query({
      text: 'SELECT id, pseudo, email FROM users WHERE id=$1',
      values: [req.session.userId]
    })
  }),

  router.post('/addArtist', async (req, res) => {
    const name = req.body.name
    const genre = req.body.genre
    const imageUrl = req.body.imageUrl

    /*if (req.session.userId === undefined) {
      res.status(401).json('Not connected')
    }
    */
    if (name === "") {
      res.status(400).json('Please insert a title')
    }

    else {
      await client.query({
        text: `INSERT INTO artists (name, genre, image)
            VALUES ($1, $2, $3)`,

        values: [name, genre, imageUrl]
      })
      res.json("success")
    }
  }),

  router.get('/getArtists', async (req, res) => {

    const list = await client.query({
      text: `SELECT * FROM artists`
    })

    if (list.rows.length == 0) {
      res.status(400).json("No artists found")
    }

    else {
      console.log(list.rows)
      res.json(list.rows)
      
    }
  }),

  router.delete('/deleteArtist/:artistId', async (req, res) => {
    const artistId = parseInt(req.params.artistId)

    test = await client.query({
      text: `SELECT * FROM artists WHERE id=$1`,
      values: [artistId]
    })

    if (test.rows.length == 0) {
      res.status(400).json("No artist with that id found")
    }

    else {
      await client.query({
        text: `DELETE FROM artists WHERE id=$1`,
        values: [artistId]
      })

      res.json("Removed successfully")
    }
  }),

  router.get('/getAlbums/:artistId', async (req, res) => {
    const artistId = parseInt(req.params.artistId)

    const list = await client.query({
      text: `SELECT * FROM albums WHERE artistId=$1`,
      values: [artistId]
    })

    res.json(list.rows)
  }),

  router.post('/addAlbum/:artistId', async (req, res) => {
    const artistId = parseInt(req.params.artistId)
    const name = req.body.name
    const releaseYear = req.body.releaseYear
    const imageUrl = req.body.imageUrl

    await client.query({
      text: `INSERT INTO albums (artistid, name, releaseyear, imageurl) VALUES ($1, $2 ,$3, $4)`, 
      values: [artistId, name, releaseYear, imageUrl]
    })
    res.json("success")
  }),

  router.delete('/deleteAlbum/:albumId', async (req, res) => {
    const albumId = parseInt(req.params.albumId)

    await client.query({
      text: `DELETE FROM albums WHERE id=$1`,
      values: [albumId]
    })

    res.json("Success")
  }),


  
module.exports = router