import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    function handleAddNewSong(){
        store.AddSong_Transaction();
    }
    let addSongButtonState=false;
    let undoButtonState=false;
    let redoButtonState=false;
    let closeButtonState=false;
    
    if (store.currentList==null||store.modalState==true){
        addSongButtonState=true;
        closeButtonState=true;
    }
    if (store.currentList==null||!store.hasRedo()){
        redoButtonState=true;
    }
    if (store.currentList==null||!store.hasUndo()){
        undoButtonState=true;
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={addSongButtonState}
                value="+"
                className={enabledButtonClass}
                onClick={handleAddNewSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={undoButtonState}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={redoButtonState}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={closeButtonState}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;