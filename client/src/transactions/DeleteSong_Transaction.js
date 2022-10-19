import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with remove song. 
 * It will be managed by the transaction stack.
 * 
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
        this.deleteSongObject=store.selectSongDelete;
    }

    doTransaction() {
        this.store.deleteSong();
    }
    
    undoTransaction() {
        this.store.insertDeletedSongBack(this.deleteSongObject)
    }
}