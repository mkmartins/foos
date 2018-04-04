export default function(state = {admin:''}, action) {
    switch(action.type) {
        case 'PLAYER_SELECTED':
            return action.payload
        case 'HANDLE_ADMIN_CHANGES':
            return { ...state, admin: action.payload}
        default:
            return state
    }
}