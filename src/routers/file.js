const express = require('express')
const storage = require('../db/firebase')
const stream = require('stream')

const router = new express.Router()

router.post('/files', async (req, res) => {
    try {
        const { data, name } = req.body

        const bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(data, 'base64'));
        
        const file = storage.bucket().file(name)

        bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: 'application/octet-stream'
            }
        }))

        await new Promise(function(resolve, reject) {
            bufferStream.on('end', resolve())
            bufferStream.on('error', err => reject(err))
        })

        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/files', async (req, res) => {
    try {
        const { name } = req.body
        const file = storage.bucket().file(name)

        file.createReadStream().pipe(res)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router