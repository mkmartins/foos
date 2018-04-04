export function selectPlayer(player) {
    return {
        type:"PLAYER_SELECTED",
        payload: player
    }
}

export function handleAdminChange(value) {
    return {
        type: "HANDLE_ADMIN_CHANGES",
        payload: value
    }
}

