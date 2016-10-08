import express from 'express'
import { validProduct } from '../filters'
import list from './list'
import add from './add'
import remove from './remove'

const router = express.Router()

router.post('/', list)
router.post('/add', validProduct, add)
router.post('/remove', validProduct, remove)

export default router
