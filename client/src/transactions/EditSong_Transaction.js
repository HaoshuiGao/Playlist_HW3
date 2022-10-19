import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store,editSongIndex,oldSong,newSong) {
        super();
        this.store = store;
        this.editSongIndex=editSongIndex;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.store.editSong(this.editSongIndex,this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.editSongIndex,this.oldSong);
    }
}