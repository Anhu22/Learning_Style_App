# TODO for MongoDB Connection and User Authentication

## Completed Tasks
- [x] Create backend server structure in "server" folder
- [x] Set up package.json with necessary dependencies (express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv)
- [x] Create server.js with Express setup, MongoDB connection, and route mounting
- [x] Create User model with schoolname, rollno, password fields
- [x] Implement auth routes for registration and login with password hashing and JWT token generation
- [x] Create .env file with MongoDB URI and JWT secret
- [x] Create README.md with setup instructions
- [x] Install backend dependencies

## Next Steps
- [ ] Ensure MongoDB is running locally or configure MongoDB Atlas
- [ ] Start the backend server: `cd server && npm run dev`
- [ ] Test registration and login endpoints using tools like Postman or curl
- [ ] Verify frontend Login.js works with the backend
- [ ] Update JWT secret in .env for production security
