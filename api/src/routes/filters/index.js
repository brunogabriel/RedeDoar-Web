export const accessTokenRequired = (req, res, next) => {
  if (!req.query.token && !req.body.token) {
    return res.send({
      status: false,
      message: 'Token inválido'
    })
  }
  next()
}
