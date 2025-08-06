const express = require('express');
const attendeeController = require('../controllers/attendee');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /events/:id/register:
 *   post:
 *     summary: Register for an event
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 */
router.post('/events/:id/register', authenticateJWT, attendeeController.registerForEvent.bind(attendeeController));

/**
 * @swagger
 * /events/:id/unregister:
 *   post:
 *     summary: Unregister from an event
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 */
router.post('/events/:id/unregister', authenticateJWT, attendeeController.unregisterFromEvent.bind(attendeeController));

/**
 * @swagger
 * /attendees/my-registrations:
 *   get:
 *     summary: List events authenticated user has registered for
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 */
router.get('/attendees/my-registrations', authenticateJWT, attendeeController.userRegistrations.bind(attendeeController));

module.exports = router;
