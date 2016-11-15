import express from 'express'
const router = express.Router()

import stats from './stats'

router.post('/stats', stats)

export default router
