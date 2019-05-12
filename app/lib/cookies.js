import cookie from 'cookie'

export const parseCookies = (req, options = {}) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)

export const storeCookies = (document, token) => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60,
  })
}

export const clearCookies = document => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1,
  })
}
