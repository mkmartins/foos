export default function(state = null, action) {
    switch(action.type) {
        case 'PLAYER_SELECTED':
            return action.payload
    }
    return state
}