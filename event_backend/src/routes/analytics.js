const express = require('express');
const analyticsController = require('../controllers/analytics');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /analytics/total-events:
 *   get:
 *     summary: Get total event count
 *     tags: [Analytics]
 */
router.get('/total-events', analyticsController.totalEvents.bind(analyticsController));

/**
 * @swagger
 * /analytics/total-attendees:
 *   get:
 *     summary: Get total registered attendances
 *     tags: [Analytics]
 */
router.get('/total-attendees', analyticsController.totalAttendees.bind(analyticsController));

/**
 * @swagger
 * /analytics/event-stats:
 *   get:
 *     summary: Get per-event registration stats
 *     tags: [Analytics]
 */
router.get('/event-stats', analyticsController.eventStats.bind(analyticsController));

module.exports = router;
