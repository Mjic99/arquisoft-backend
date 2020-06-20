const express = require('express')
const Tag = require('../models/tag')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tags', auth, async (req, res) => {
    const tag = new Tag(req.body)
    try {
        await tag.save()
        res.status(201).send(tag)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/tags', auth, async (req, res) => {
    try {
        const tags = await Tag.find()
        res.send(tags)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router