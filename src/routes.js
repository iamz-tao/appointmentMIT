// @ts-ignore
const routes = require('next-routes')()

routes
  .add('home', '/', 'home')
  .add('register', '/register', 'register')

  // Professor
  .add('lecturer', '/lecturer', '/lecturer')
  
  // Student 
  .add('student', '/student', '/student')
  
  // Admin
  .add('admin', '/admin', '/admin')
  .add('register-admin', '/adminRegister', '/admin/adminRegister')
module.exports = routes
