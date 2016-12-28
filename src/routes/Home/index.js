module.exports = {
  path: 'home',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      console.log('-----------load home------------');
      cb(null, require('./components/Home'))
    })
  }
}
