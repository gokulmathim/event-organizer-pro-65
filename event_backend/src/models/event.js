class EventModel {
  constructor() {
    // event sample: { id, title, description, date, location, createdBy, createdAt }
    this.events = [];
    this.lastId = 0;
  }
  // PUBLIC_INTERFACE
  createEvent({ title, description, date, location, createdBy }) {
    /** Creates an event. */
    const id = (++this.lastId).toString();
    const event = { id, title, description, date, location, createdBy, createdAt: new Date().toISOString() };
    this.events.push(event);
    return event;
  }
  // PUBLIC_INTERFACE
  getEventById(id) {
    /** Returns event by ID. */
    return this.events.find((ev) => ev.id === id) || null;
  }
  // PUBLIC_INTERFACE
  listEvents() {
    /** Lists all events. */
    return this.events.slice();
  }
  // PUBLIC_INTERFACE
  updateEvent(id, updates) {
    /** Updates an event by ID. */
    const idx = this.events.findIndex((ev) => ev.id === id);
    if (idx === -1) return null;
    this.events[idx] = { ...this.events[idx], ...updates };
    return this.events[idx];
  }
  // PUBLIC_INTERFACE
  deleteEvent(id) {
    /** Deletes an event by ID. */
    const idx = this.events.findIndex((ev) => ev.id === id);
    if (idx === -1) return false;
    this.events.splice(idx, 1);
    return true;
  }
  // PUBLIC_INTERFACE
  getEventsByUser(userId) {
    /** Lists events created by a user. */
    return this.events.filter((e) => e.createdBy === userId);
  }
}

module.exports = new EventModel();
