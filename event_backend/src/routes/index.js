const express = require('express');
const healthController = require('../controllers/health');

const userRoutes = require('./user');
const eventRoutes = require('./event');
const attendeeRoutes = require('./attendee');
const analyticsRoutes = require('./analytics');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// Route mounting
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/', attendeeRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
