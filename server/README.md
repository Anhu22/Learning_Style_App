# Backend Server for Learning Style App

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the `server` directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/learning_style_app
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

- POST `/api/auth/register` - Register a new user  
  Request body: `{ schoolname, rollno, password }`

- POST `/api/auth` - Login  
  Request body: `{ rollno, password }`  
  Response: `{ token, user }`

## Notes

- Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env` accordingly.
- The server runs on port 5000 by default.
