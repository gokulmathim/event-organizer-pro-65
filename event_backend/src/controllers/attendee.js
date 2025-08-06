const attendeeModel = require('../models/attendee');
const eventModel = require('../models/event');

/**
 * Attendee Controller: Manage event registration and attendee lists.
 */
class AttendeeController {
  // PUBLIC_INTERFACE
  registerForEvent(req, res) {
    /** Register authenticated user for eventId. */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const ok = attendeeModel.register(id, req.user.id);
    if (!ok) return res.status(400).json({ message: 'Already registered' });
    return res.json({ message: 'Registered' });
  }
  // PUBLIC_INTERFACE
  unregisterFromEvent(req, res) {
    /** Unregister user from event. */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const ok = attendeeModel.unregister(id, req.user.id);
    if (!ok) return res.status(400).json({ message: 'Not registered' });
    return res.json({ message: 'Unregistered' });
  }
  // PUBLIC_INTERFACE
  userRegistrations(req, res) {
    /** Lists events this user has registered for. */
    const eventIds = attendeeModel.eventsOf(req.user.id);
    return res.json({ events: eventIds });
  }
}

module.exports = new AttendeeController();
