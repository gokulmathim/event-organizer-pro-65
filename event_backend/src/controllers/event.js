const eventModel = require('../models/event');
const attendeeModel = require('../models/attendee');

/**
 * Event Controller: CRUD, plus public listing.
 */
class EventController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create an event as the authenticated user. */
    const { title, description, date, location } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date required' });
    }
    const event = eventModel.createEvent({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });
    return res.status(201).json({ event });
  }
  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all events (public). */
    const list = eventModel.listEvents();
    return res.json({ events: list });
  }
  // PUBLIC_INTERFACE
  details(req, res) {
    /** Get event detail by id. */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json({ event });
  }
  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update event by id (only creator allowed). */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Not permitted' });
    }
    const { title, description, date, location } = req.body;
    const updated = eventModel.updateEvent(id, { title, description, date, location });
    return res.json({ event: updated });
  }
  // PUBLIC_INTERFACE
  remove(req, res) {
    /** Delete event by id (only creator allowed). */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Not permitted' });
    }
    eventModel.deleteEvent(id);
    return res.json({ message: 'Deleted' });
  }
  // PUBLIC_INTERFACE
  myEvents(req, res) {
    /** List events created by user. */
    const events = eventModel.getEventsByUser(req.user.id);
    return res.json({ events });
  }
  // PUBLIC_INTERFACE
  attendees(req, res) {
    /** Get attendee list for an event (creator only). */
    const { id } = req.params;
    const event = eventModel.getEventById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Not permitted' });
    }
    const attendeeIds = attendeeModel.attendeesOf(id);
    return res.json({ attendees: attendeeIds });
  }
}

module.exports = new EventController();
