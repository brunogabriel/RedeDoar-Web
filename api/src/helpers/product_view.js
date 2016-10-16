import { asset } from './'

export default {
  prepareData: function(products) {
    if ('map' in products) {
      return products.map((product) => {
        product = this.prepareDataItem(product)
        return product
      })
    } else {
      products = this.prepareDataItem(products)
      return products
    }
  },
  prepareDataItem: function(product) {
    for (let i in product.images) {
      let image = product.images[i]
      if (image.filename) {
        image.set('loader', this.getFullPath(image, 'loader'), { strict: false })
        image.set('thumb', this.getFullPath(image, 'thumb'), { strict: false })
        image.set('large', this.getFullPath(image, 'large'), { strict: false })
        product.images[i] = image
      }
    }
    return product
  },
  getFullPath: function(image, size) {
    let directory = image.directory.replace('public', '')
    return asset.url(`${directory}${size}_${image.filename}`)
  }
}
