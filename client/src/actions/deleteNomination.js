import { DELETE_NOMINATION } from './types';


export const deleteNomination = (movie) =>{
    return(dispatch) => {
        dispatch({
            type: DELETE_NOMINATION,
            payload: movie
        });
    }
}