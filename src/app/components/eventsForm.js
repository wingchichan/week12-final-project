import React, { useState } from 'react';

const EventsForm = () => {
  const [formData, setFormData] = useState({
    activity: '',
    location: '',
    eventTime: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      activity: formData.activity,
      location: formData.location,
      event_time: formData.eventTime,
      price_per_person: formData.price ? parseFloat(formData.price).toFixed(2) : null
    };
    console.log('Event data to invite friends:', eventData);
    setFormData({ activity: '', location: '', eventTime: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          id="activity"
          name="activity"
          value={formData.activity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="eventTime">Event Time:</label>
        <input
          type="datetime-local"
          id="eventTime"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price per Person:</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventsForm;