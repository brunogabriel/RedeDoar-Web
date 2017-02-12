import express from 'express'
import { ProductCategory } from '../../models'
import list from './list'

const router = express.Router()

router.get('/', list)

export default router
