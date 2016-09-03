export const accessTokenRequired = (req, res, next) => {
  if (!req.query.access_token) {
    return res.send({
      status: false,
      message: 'Requer access token'
    })
  }
  next()
}
