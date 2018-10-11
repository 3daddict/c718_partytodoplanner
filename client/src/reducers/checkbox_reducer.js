import types from '../actions/types';

const DEFAULT_STATE = {
    username: ''
};

export default (state = DEFAULT_STATE, action) =>  {
    switch(action.type){
        case types.CHECK:
            return {...state};
        case types.UNCHECK:
            return {...state};
        default:
            return state;
    }
};