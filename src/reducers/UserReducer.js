const initialState = {
    name: 'Visitante',
    counter: 0
}
const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload.name };
            break;

        case 'INCREMENT_COUNTER':
            let newCount = state.counter + 1
            return { ...state, counter: newCount };
            break;
    };

    return state;
}

export default UserReducer;