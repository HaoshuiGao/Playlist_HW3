import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const {store} = useContext(GlobalStoreContext);

    let name = "";
    if (store.selectSongDelete!==null) {
        name = store.selectSongDelete.title;
    }
    return (
        <div
            //MODAL (i.e. dialog) FOR VERIFYING THE DELETION OF A SONG 
            class="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-delete-song-root'>
                <div class="modal-north">
                    Remove song?
                </div>
                <div class="modal-center">
                    <div class="modal-center-content">
                        Are you sure you wish to permanently remove <span>{name}</span> from the playlist?
                    </div>
                </div>
                <div class="modal-south">
                    <input type="button" 
                        id="delete-song-confirm-button" 
                        class="modal-button" 
                        onClick={store.deleteSong}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-song-cancel-button" 
                        class="modal-button" 
                        onClick={store.hideDeleteSongModal}
                        value='Cancel' />
                    </div>
            </div>
        </div>
    );
}
export default DeleteSongModal;
