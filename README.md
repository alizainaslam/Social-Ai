# Social AI Backend

This is the backend for the Social AI project. It is built using Node.Ts and Express.js, and it uses MongoDB as the database. It generates captions for images using the gemini API. It also has a simple authentication system using JWT.

## Installation
1. Clone the repository:
   ```bash
   git clone
    ```
2. Navigate to the backend directory:
   ```bash
    cd backend
    ```
3. Install the dependencies:
   ```bash
    npm install
    ```
4. Create a `.env` file in the root of the backend directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ImageKit_API_KEY=your_imagekit_api_key (Private, Public, URL endpoint)
    ```
5. Make sure you have Typescript installed globally:
   ```bash
    npm install -g typescript
    ```
6. Start the server:
   ```bash
   npm run dev
    ```
## API Endpoints
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `POST /api/captions`: Generate a caption for an image.

## Other Information
- It has also vitest for testing so you can run tests using:
   ```bash
   npm run test
    ```
## You can see live demo of the backend here: [Social AI Backend]()