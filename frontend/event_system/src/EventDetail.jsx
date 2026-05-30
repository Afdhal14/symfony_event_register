import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function EventDetail() {

    const navigate = useNavigate();
    const {id} = useParams();

    const [event, setEvent] = useState(null);

    useEffect(() =>{
        fetch(`http://localhost:8000/events/${id}`)
        .then(response => response.json())
        .then(data => setEvent(data))
        .catch(error => console.error('Error fetching event details:', error));
    }, [id]);

    if (!event) {
        return <h2>Loading...</h2>;
    }

    const handleToggleStatus = async () => {
        const newStatus = event.status === "OPEN" ? "CLOSED" : "OPEN";
        try{
            const response = await fetch(`http://localhost:8000/events/${id}/status`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if(response.ok){
                const updatedEvent = { ...event, status: newStatus };
                setEvent(updatedEvent);
            }
        }catch(error){
            console.error('Error updating event status:', error);
        }
    }

    const handleDelete = async() =>{
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if(!confirmed){
            return;
        }
        try{
            const response = await fetch(`http://localhost:8000/events/${id}`,{method: 'DELETE'});
            if(response.ok){
                alert("Event deleted successfully!");
                navigate('/');
            }
        }catch(error){
            console.error('Error deleting event:', error);
        }
    }

    return (
        <div className="event-detail">
            <h1>{event.title}</h1>

            <p>
                <strong>Description:</strong> {event.description}
            </p>

            <p>
                <strong>Location:</strong> {event.location}
            </p>

            <p>
                <strong>Date:</strong> {event.eventDate}
            </p>

            <p>
                <strong>Seats:</strong> {event.maxSeats}
            </p>

            <div className="status-container">
                <p>
                    <strong>Status:</strong>
                    <span className={ event.status === "OPEN" ? "status-open" : "status-closed"}>
                        {event.status}
                    </span>
                </p>

                <button onClick={handleToggleStatus} className="toggle-status-btn">
                    Toggle Status
                </button>
            </div>

            <button onClick={() => (event.status=== "OPEN") ? alert("Registration Successful!"):alert("Event is closed.")} className="eventDetail-btn">
                Register Now
            </button>
            <button onClick={()=>navigate('/')} className="eventDetail-btn">
                Back to Events
            </button>
            <button onClick={handleDelete} className="eventDetail-btn">
                Delete Event
            </button>
        </div>
    )
}
export default EventDetail;