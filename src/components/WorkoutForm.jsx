import { useState } from "react";
import { useWorkout } from "../hooks/useWorkout";

const WorkoutForm = () => {
    const { dispatch } = useWorkout();

    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch("http://localhost:3333/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");

            setError(null);
            setEmptyFields([]);

            console.log("new workout addded", json);

            dispatch({
                type: "CREATE_WORKOUT",
                payload: json,
            });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                className={emptyFields.includes("title") ? "error" : ""}
                onChange={(event) => setTitle(event.target.value)}
                value={title}
            />

            <label>Load (in Kg):</label>
            <input
                type="number"
                className={emptyFields.includes("load") ? "error" : ""}
                onChange={(event) => setLoad(event.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                className={emptyFields.includes("reps") ? "error" : ""}
                onChange={(event) => setReps(event.target.value)}
                value={reps}
            />

            <button type="submit">Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
