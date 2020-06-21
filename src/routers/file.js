const express = require('express')
const storage = require('../db/firebase')
const stream = require('stream')
const mime = require('mime-types')

const router = new express.Router()

router.post('/files', async (req, res) => {
    try {
        var { data, path, mimeType } = req.body

        const bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(data, 'base64'));
        
        const file = storage.bucket().file(path)

        if (!mimeType)
            mimeType = mime.lookup(path)

        bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: mimeType || 'application/octet-stream'
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
        const { path } = req.body
        const file = storage.bucket().file(path)

        const metadata = await file.getMetadata()
        const contentType = metadata[1].body.contentType

        if (!contentType)
            contentType = mime.lookup(path)

        const filename = path.substring(path.lastIndexOf('/') + 1)

        res.set({
            'Content-Type': contentType || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${filename}"`
        })

        file.createReadStream().pipe(res)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router