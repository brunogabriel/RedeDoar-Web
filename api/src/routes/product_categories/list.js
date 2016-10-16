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
    id: 1,
    name: 'Food',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 2,
    name: 'Forniture',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 3,
    name: 'Clothes',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 4,
    name: 'Kids',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 5,
    name: 'Eletronics',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 6,
    name: 'Toys',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 7,
    name: 'Pets',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })
  product_categories.push({
    id: 8,
    name: 'Others',
    image: asset.url('/uploads/product_categories/food.jpg'),
    imagePlaceholder: asset.url('/uploads/product_categories/food_placeholder.jpg'),
  })

  res.send({
    status: true,
    data: product_categories
  })
}
