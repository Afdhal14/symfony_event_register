import React, { useState,useEffect } from 'react';
import EventCard from './EventCard.jsx';
import { useNavigate } from 'react-router-dom';

function Events(){

    const[events , setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:8000/events')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    },[]);

    console.log(events);

    return(
        <div>
            <div className="navbar">
                <h1>Events</h1>
                <button className="add-event-btn" onClick={() => navigate('/events/new')}>Add Event</button>
            </div>
            <div className="events-container">
            {
                events.map((event)=>{
                    return <EventCard key={event.id} event={event} />
                })
            }
            </div>
        </div>
    )
}

export default Events;