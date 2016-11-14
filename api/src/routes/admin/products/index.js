import express from 'express'
const router = express.Router()

import list from './list'
import show from './show'
import changeStatus from './change-status'

router.post('/', list)
router.post('/:id', show)
router.post('/:id/change-status', changeStatus)

export default router
