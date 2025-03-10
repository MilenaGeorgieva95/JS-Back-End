1. Initialize project 
   * Initialize node package `npm init -y`
   * Install nodemon `npm i -D nodemon`
   * Add start scripts
   * Add initial folder structure
   * Change module type
   * Add debugging
   * Add env variable file
   * Install and configure dotenv `npm i dotenv`
2. Setup Express
   * Install `npm i express`
   * Add static resources
   * Configure static middleware
   * Add body parser
   * Add moduler routers
3. Setup handlebars
   * Install handlebars `npm i express-handlebars`
   * Add view engine
   * Set view directory
   * Set view engine
   * Add home view
   * Add layout
   * Add partials dir
   * Add dynamic title
4. Add database
   * Install mongoose `npm i mongoose`
   * Connect to local db
   * Add user model
5. Register
   * Fix navigation links
   * Add template
   * Add auth controller
   * Render page on get
   * Post action
   * Add auth service register
   * Install bcrypt `npm i bcrypt`
   * Hash password
   * Check for password missmatch
   * Check if user exists
6. Login
   * Install jsonwebtoken `npm i jsonwebtoken`
   * Convert jsonwebtoken to promise based lib (optionally)
   * Add typescript declaration documentation (optionally)
   * Install cookie-parser `npm i cookie-parser`
   * Add cookie parser middleware
   * Add login page
   * Add login post action
   * Add authService login method
   * Generate jwt
   * Return jwt with http only cookie
   * Auto login after register
7. Logout
8. Authorization
   * Add auth middleware
   * Add isAuth middleware
9. Error Handling
   * Add error notification
   * Add error message util
   * Handle register errors
   * Handle login errors
10. Dynamic Navigation
* * * ==> DON'T FORGET PAGE TITLES

##Exam Steps
1.Modify views
*login / register
*home / 404
*main layout with dynamic navigation
2.Add static resources
3.Modify DB name
4.Modify user model

11. Bonus
 - [ ] Dynamic Navigation
 - [ ] Dynamic Titles
 - [ ] Set titles from view
 <!-- - [ ] Async jsonwebtoken
 - [ ] Add types for jsonwebtoken lib -->
12. TempData | Optional
 - [ ] Install express session `npm i express-session`
 - [ ] Config express session
 - [ ] Add tempData middleware
    
## Adapt Skeleton to New Exam
 - [ ] Remove old styles and paste new styles
 - [ ] Copy all html files into views folder
 - [ ] Extract new layout
   - [ ] Add header and fix title
   - [ ] Fix navigation
   - [ ] Fix error notification
   - [ ] Add {{{body}}}
   - [ ] Add footer
 - [ ] Switch home template
 - [ ] Change db name
 - [ ] Modify login page
   - [ ] Add values to fields
 - [ ] Modify register page
   - [ ] Add values to fields
 - [ ] Modify User model
 - [ ] Modify token data
 - [ ] Check required fields