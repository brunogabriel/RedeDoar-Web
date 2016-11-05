import { ProductFavorite } from '../../models'
import { handleError } from '../../helpers'

export default (req, res, next) => {
  let options = {
    _id: req.params.id,
    user: req.user.id
  }
  ProductFavorite.findOne(options).then((product_favorite) => {
    if (product_favorite) {
      return product_favorite.remove().then((product_favorite) => {
        if (product_favorite) {
          res.send({
            status: true,
            message: 'Favorito removido com sucesso'
          })
        } else {
          res.send({
            status: false,
            message: 'Erro ao remover produto dos favoritos'
          })
        }
      })
    } else {
      res.send({
        status: false,
        message: 'Favorito não encontrado'
      })
    }
  })
}
