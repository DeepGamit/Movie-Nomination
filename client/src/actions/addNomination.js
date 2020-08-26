import { ADD_NOMINATION } from './types';


export const addNomination = (movie) =>{
    return(dispatch) => {
        dispatch({
            type: ADD_NOMINATION,
            payload: movie
        });
    }
}