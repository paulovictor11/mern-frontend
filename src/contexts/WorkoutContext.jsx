import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
    if (action.type === "SET_WORKOUTS") {
        return {
            workouts: action.payload,
        };
    }

    if (action.type === "CREATE_WORKOUT") {
        return {
            workouts: [action.payload, ...state.workouts],
        };
    }

    if (action.type === "DELETE_WORKOUT") {
        return {
            workouts: state.workouts.filter(
                (workout) => workout._id !== action.payload._id
            ),
        };
    }

    return state;
};

export const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null,
    });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};
