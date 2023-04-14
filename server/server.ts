import express from 'express'
import { join } from 'node:path'

import artworksRoutes from './routes/artworks'
import external from './routes/external'
import collections from './routes/collection'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))
server.use('/api/v1/collections', collections)

server.use('/api/v1/artworks', artworksRoutes)
server.use('/api/v1/', external)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

export default server
