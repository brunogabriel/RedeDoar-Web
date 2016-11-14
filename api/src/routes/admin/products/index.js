import express from 'express'
const router = express.Router()

import changeStatus from './change-status'

router.post('/:id/change-status', changeStatus)

export default router
