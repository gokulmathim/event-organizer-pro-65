class AttendeeModel {
  constructor() {
    // Map eventId -> Set of userId
    this.eventAttendees = new Map();
    // For fast user-event lookup: Map userId -> Set of eventId
    this.userEvents = new Map();
  }
  // PUBLIC_INTERFACE
  register(eventId, userId) {
    /** Registers a user for an event. Returns true on success, false if already registered. */
    if (!this.eventAttendees.has(eventId)) this.eventAttendees.set(eventId, new Set());
    if (!this.userEvents.has(userId)) this.userEvents.set(userId, new Set());
    if (this.eventAttendees.get(eventId).has(userId)) return false;
    this.eventAttendees.get(eventId).add(userId);
    this.userEvents.get(userId).add(eventId);
    return true;
  }
  // PUBLIC_INTERFACE
  unregister(eventId, userId) {
    /** Removes a registration. */
    if (!this.eventAttendees.has(eventId)) return false;
    const removed = this.eventAttendees.get(eventId).delete(userId);
    if (this.userEvents.has(userId)) this.userEvents.get(userId).delete(eventId);
    return removed;
  }
  // PUBLIC_INTERFACE
  attendeesOf(eventId) {
    /** Returns array of userIds registered for event. */
    return Array.from(this.eventAttendees.get(eventId) || []);
  }
  // PUBLIC_INTERFACE
  eventsOf(userId) {
    /** Returns array of eventIds this user is registered for. */
    return Array.from(this.userEvents.get(userId) || []);
  }
  // PUBLIC_INTERFACE
  isRegistered(eventId, userId) {
    /** Checks if user is registered for event. */
    return (this.eventAttendees.get(eventId) || new Set()).has(userId);
  }
  // PUBLIC_INTERFACE
  attendeeCount(eventId) {
    /** Returns how many are registered for the event. */
    return (this.eventAttendees.get(eventId) || new Set()).size;
  }
}

module.exports = new AttendeeModel();
