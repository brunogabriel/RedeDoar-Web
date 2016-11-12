import express from 'express'
const router = express.Router()

import list from './list'
import show from './show'

router.post('/', list)
router.post('/:id', show)

export default router
