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
    product.set('delivery_label', this.getDeliveryLabel(product.delivery), { strict: false })
    return product
  },
  getFullPath: function(image, size) {
    let directory = image.directory.replace('public', '')
    return asset.url(`${directory}${size}_${image.filename}`)
  },
  getDeliveryLabel: function(delivery) {
    delivery = parseInt(delivery)
    const map = {
      1: 'em mãos',
      2: 'a combinar',
    }
    return (map[delivery] ? map[delivery] : 'não informado')
  },
  getConditionLabel: function(condition) {
    condition = parseInt(condition)
    const map = {
      1: 'novo',
      2: 'usado',
    }
    return (map[condition] ? map[condition] : 'não informado')
  }
}
