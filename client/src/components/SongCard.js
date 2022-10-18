import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isDragging,setIsDragging]=useState(false)
    const [draggedTo,setDraggedTo]=useState(false)
    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        setIsDragging(true);
    }
    function handleDragOver(event) {
        event.preventDefault();
        setDraggedTo(true);
    }
    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);

    }
    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }
    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setIsDragging(false);
        setDraggedTo(false);
        console.log("sourceId:"+sourceId.substring(0,1))
        console.log("targetId:"+targetId.substring(0,1))
        
        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId.substring(0,1), targetId.substring(0,1));
    }
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;