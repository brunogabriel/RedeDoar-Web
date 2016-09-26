import { ProductCategory } from '../../models'

export default (req, res, next) => {
  // return ProductCategory.find().then((product_categories) => {
  //   res.send({
  //     status: true,
  //     data: product_categories
  //   })
  // })

  let product_categories = []

  product_categories.push({
    name: 'Food',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Forniture',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Clothes',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Kids',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Eletronics',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Toys',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Pets',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })
  product_categories.push({
    name: 'Others',
    image: 'http://rede-doar-api.dev.azk.io/uploads/product_categories/food.jpg'
  })

  res.send({
    status: true,
    data: product_categories
  })
}
