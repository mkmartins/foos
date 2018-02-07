import React from 'react'

const ChoosePlayer = (props) =>{
    return(
        <div onClick={()=>props.selectPlayer(props.player)}>
            {props.player.name}
        </div>
    )
}

export default ChoosePlayer