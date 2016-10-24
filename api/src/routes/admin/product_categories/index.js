import express from 'express'
import { ProductCategory } from '../../../models'
import list from './list'

const router = express.Router()

router.post('/', list)

export default router
