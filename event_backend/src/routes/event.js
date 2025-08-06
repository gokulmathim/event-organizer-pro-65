const express = require('express');
const eventController = require('../controllers/event');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: List all events
 *     tags: [Events]
 */
router.get('/', eventController.list.bind(eventController));

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticateJWT, eventController.create.bind(eventController));

/**
 * @swagger
 * /events/my:
 *   get:
 *     summary: List events created by authenticated user
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.get('/my', authenticateJWT, eventController.myEvents.bind(eventController));

/**
 * @swagger
 * /events/:id:
 *   get:
 *     summary: Get single event detail
 *     tags: [Events]
 */
router.get('/:id', eventController.details.bind(eventController));

/**
 * @swagger
 * /events/:id:
 *   put:
 *     summary: Update event (creator only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticateJWT, eventController.update.bind(eventController));

/**
 * @swagger
 * /events/:id:
 *   delete:
 *     summary: Delete event (creator only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticateJWT, eventController.remove.bind(eventController));

/**
 * @swagger
 * /events/:id/attendees:
 *   get:
 *     summary: Get attendee list for an event (creator only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id/attendees', authenticateJWT, eventController.attendees.bind(eventController)); 

module.exports = router;
