import { createObjectId as id } from 'pow-mongodb-fixtures'

exports.products = [
  {
    _id: id(),
    title: 'Televisão tubo',
    description: 'Televisão tubo',
    location: {
      context: 'casa',
      latlng: [-23, -45]
    },
    delivery: '1',
    condition: 'new',
    email: 'email@gmail.com',
    telephone: '55 12 90055000',
    category: '58a38801d2b45400add5aa82',
    user: '58a3885bd0c52900e1d7bdc9',
    images: '1',
    comments: '1',
    active: true,
  }
]
