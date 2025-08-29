const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new student
 *     description: Register a student with email, password, and other details. 100 level students can use any email and must provide JAMB reg or matric number. 200 level and above must use school email and provide matric number.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: student@fuoye.edu.ng
 *               password:
 *                 type: string
 *                 example: yourpassword
 *               jambReg:
 *                 type: string
 *                 example: JAMB123456
 *               matric_number:
 *                 type: string
 *                 example: ABC/1234/5678
 *               full_name:
 *                 type: string
 *                 example: Oyindamola Ajala
 *               faculty_name:
 *                 type: string
 *                 example: Engineering
 *               department_name:
 *                 type: string
 *                 example: Computer Engineering
 *               user_type:
 *                 type: string
 *                 example: student
 *               level:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Server error
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with email, matric number, or JAMB registration number along with password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email, matric number, or JAMB registration number
 *                 example: student@fuoye.edu.ng or ABC/2023/001 or JAMB123456
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/login', userController.login);

module.exports = router;
