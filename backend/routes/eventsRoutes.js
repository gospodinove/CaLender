const express = require('express')
const { validate } = require('indicative/validator')
const { replace_id } = require('../utils')
const { validationMessages } = require('../validation')

const router = express.Router()

router.post('', async (req, res) => {
  const db = req.app.locals.db

  const event = req.body

  try {
    const schema = {
      title: 'required|string',
      description: 'string|max:250',
      start: 'required|date',
      end: 'required|date'
    }

    await validate(event, schema, validationMessages)

    await db.collection('events').insertOne(event)

    res.json({ success: true, event: replace_id(event) })
  } catch (errors) {
    res.json({ success: false, errors })
  }
})

module.exports = router
