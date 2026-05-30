import {useNavigate} from 'react-router-dom';

function EventCard({ event }) {
  
    const navigate = useNavigate();


    return(
        <>
            <div className="event-card">
                <h2>{event.title}</h2>
                <p>{event.location}</p>
                <p>{event.eventDate}</p>
                <p><span className="maxSeats">{event.maxSeats} </span>seats available</p>
                <div className="button-container">
                    <button onClick={() => navigate(`/events/${event.id}`)} className="info-button">Info</button>
                    <button onClick={() => navigate(`/events/edit/${event.id}`)} className="edit-button">Edit</button>
                </div>
            </div>
        </>
    );
}

export default EventCard;