// @ts-ignore
const routes = require('next-routes')()

routes
  .add('home', '/', 'home')
  .add('login', '/login', 'login')
  .add('register', '/register', 'register')

  // Professor
  .add('professor', '/professor', '/professor')
  
  // Admin
  .add('admin', '/admin', '/admin')
  .add('register-admin', '/adminRegister', '/admin/adminRegister')
module.exports = routes
