# Payify Server

This is a backend server for Payify. It allows students of FUOYE to register and pay their dues online. The system is built with Node.js, Express, and MongoDB.

## Features
- Student registration (with school or personal email, depending on level)
- Secure password storage
- MongoDB database

## Requirements
- Node.js (v18 or newer recommended)
- MongoDB database (cloud or local)

## How to Set Up and Run

1. **Download or Clone the Project**
   - Download the project folder to your computer.

2. **Install Node.js**
   - If you don't have Node.js, download and install it from [nodejs.org](https://nodejs.org/).

3. **Install Dependencies**
   - Open the project folder in VS Code or any terminal.
   - Run this command:
     ```
     npm install
     ```

4. **Set Up MongoDB**
   - You need a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud) or install MongoDB locally.
   - Copy your MongoDB connection string.

5. **Configure Environment Variables**
   - Open the `.env.example` file in the project folder. Create your own .env, and paste all the content of youur .example into your new .env 
   - Replace USERNAME with the username I sent to you and PASSWORD with the password I sent to you:
     ```
        MONGO_URI=mongodb+srv://theusername:thepassword@cluster0.pwliybl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        PORT=5000

     ```

6. **Start the Server**
   - In the terminal, run:
     ```
     npm start
     ```
   - The server will start. You should see a message like `Server running on port 5000`.

## How to Register a Student
- Use a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to send a POST request to:
  ```
  https://{base_url}/api/users/register
  ```
- The request body should be in JSON format. Example for a fresher (100 level):
  ```json
  {
    "email": "student@gmail.com",
    "password": "yourpassword",
    "jambReg": "JAMB123456",
    "full_name": "Oyindamola Ajala",
    "faculty_id": 1,
    "department_id": 2
  }
  ```
- For 200 level and above, use your school email and matric number.

## Notes
- Passwords are stored securely using bcrypt.
- Only students with valid emails and required details can register.
- You can add more features as needed.

## Need Help?
If you get stuck, ask myself or Rex for help or search for tutorials on Node.js, Express, and MongoDB.
