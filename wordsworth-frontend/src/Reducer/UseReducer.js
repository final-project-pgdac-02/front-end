export const initializeState = null;

export const reducer = (state,action) =>{
    if(action.type === "USER"){
        return action.payload;
    }
    else if(action.type === "ADMIN"){
        return action.payload;
    }
    return state;
}