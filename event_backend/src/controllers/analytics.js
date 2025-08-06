const eventModel = require('../models/event');
const attendeeModel = require('../models/attendee');

/**
 * Analytics Controller: Basic stats endpoints.
 */
class AnalyticsController {
  // PUBLIC_INTERFACE
  totalEvents(req, res) {
    /** Returns total number of events. */
    return res.json({ total: eventModel.listEvents().length });
  }
  // PUBLIC_INTERFACE
  totalAttendees(req, res) {
    /** Total number of registered attendances (sum all event registrations). */
    const events = eventModel.listEvents();
    let count = 0;
    for (const ev of events) {
      count += attendeeModel.attendeeCount(ev.id);
    }
    return res.json({ total: count });
  }
  // PUBLIC_INTERFACE
  eventStats(req, res) {
    /** Per-event registration counts. */
    const events = eventModel.listEvents();
    const stats = events.map((ev) => ({
      id: ev.id,
      title: ev.title,
      attendees: attendeeModel.attendeeCount(ev.id),
    }));
    return res.json({ eventStats: stats });
  }
}

module.exports = new AnalyticsController();
