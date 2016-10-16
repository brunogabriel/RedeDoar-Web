import { ProductCategory } from '../../models'
import { asset } from '../../helpers'

export default (req, res, next) => {
  // return ProductCategory.find().then((product_categories) => {
  //   res.send({
  //     status: true,
  //     data: product_categories
  //   })
  // })

  // let data = []
  // data.push({ name: 'Food' })
  // data.push({ name: 'Forniture' })
  // data.push({ name: 'Clothes' })
  // data.push({ name: 'Kids' })
  // data.push({ name: 'Eletronics' })
  // ProductCategory.collection.insert(data, (err, data) => {
  //   if (err) new Error(err);
  //   console.log('data', data);
  // })

  let product_categories = []

  product_categories.push({
    name: 'Food',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Forniture',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Clothes',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Kids',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Eletronics',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Toys',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Pets',
    image: asset.url('/uploads/product_categories/food.jpg')
  })
  product_categories.push({
    name: 'Others',
    image: asset.url('/uploads/product_categories/food.jpg')
  })

  res.send({
    status: true,
    data: product_categories
  })
}
