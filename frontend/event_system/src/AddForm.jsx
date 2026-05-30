import { useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

function AddForm(){

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        maxSeats: "",
        status: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:8000/events/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            navigate("/");
        } catch (error) {
            console.error('Error updating event:', error);
        }
    }


    return(
        <div className="edit-event">
            <h1>Add Event</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <textarea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <input
                    type="datetime-local"
                    name="eventDate"
                    value={event.eventDate}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="maxSeats"
                    value={event.maxSeats}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={event.status}
                    onChange={handleChange}
                >
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSED</option>
                </select>

                <button type="submit">
                    Add Event
                </button>
                <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
                    Cancel
                </button>

            </form>
        </div>
    )
}

export default AddForm;