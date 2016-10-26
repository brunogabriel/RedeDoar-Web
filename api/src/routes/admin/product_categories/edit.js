import { ProductCategory } from '../../../models'
import { cropFiles, productCategoryView, productCategoryImage } from '../../../helpers'

export default (req, res, next) => {
  let product_category = req.product_category
  return product_category.patchEntity(req.body).save().then((product_category) => {
    let options = product_category.getImageOptions()
    let images = cropFiles(req.files, options)
    let output = {
      status: true,
      message: 'Categoria alterada com sucesso'
    }

    if (images.length > 0) {
      productCategoryImage.remove(product_category.image)
      product_category.image = images[0]
      product_category.save((err) => {
        if (err) new Error(err)
        output.data = productCategoryView.prepareData(product_category)
        res.send(output)
      })
    } else {
      output.data = productCategoryView.prepareData(product_category)
      res.send(output)
    }
  })
}
