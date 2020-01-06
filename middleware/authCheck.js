module.exports = (req, res, next) => {
  const isUserLoggedIn = req.session.isUserLoggedIn;
  if(isUserLoggedIn) {
    next();
  } else {
    req.flash('authError', 'Zaloguj się aby uzyskać dostęp do tego działania !');
    res.redirect('/products');
  }
}