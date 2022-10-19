import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SELECT_SONG:"SELECT_SONG",
    EDIT_SONG:"EDIT_SONG",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listForDeletion:null,
        selectSongDelete:null,
        selectSongDeleteIndex:null,
        selectSongEdit:null,
        selectSongEditIndex:null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: payload,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // SONG DELETE UPDATE OF ITS OBJECT AND INDEX
            case GlobalStoreActionType.SELECT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:payload.selectSongDelete,
                    selectSongDeleteIndex:payload.selectSongDeleteIndex,
                    selectSongEdit:store.selectSongEdit,
                    selectSongEditIndex:store.selectSongEditIndex
                });
            }
            // SONG EDIT UPDATE OF ITS OBJECT AND INDEX
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion:store.listForDeletion,
                    selectSongDelete:store.selectSongDelete,
                    selectSongDeleteIndex:store.selectSongDeleteIndex,
                    selectSongEdit:payload.selectSongEdit,
                    selectSongEditIndex:payload.selectSongEditIndex
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    //this function processes used for new list creation
    store.createNewList= function() {
        let newList={
            name:"Untitled" ,
            songs:[]
        }
        
        async function asyncCreateNewList(){
            //this handles the storing of new data in database already
            const response= await api.createNewList(newList);
            let playlist=response.data.playlist;
            //get the new list id
            let newListId=playlist._id;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload:playlist
            });
            // store.setCurrentList(newListId)
            // enter to edit mode (same as select a list) for this list
            async function asyncsetCurrentList(newListId){
                await store.setCurrentList(newListId)
            }
            asyncsetCurrentList(newListId);
        }
        asyncCreateNewList();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setListNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    
    //functions used for list deletion,
    //show the modal up, filter out the correct idnamepair and store in states=
    store.showDeleteListModal=function(_id){
        let modal= document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
        let markedListIdNamePair=store.idNamePairs.filter(list=>list._id===_id)[0]
        storeReducer({
            type:GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            //this payload stores playlist id and name 
            payload:markedListIdNamePair
        })        
    }

    //hide the modal, change the list, update the listForDeletion
    store.deleteList=function(){
        let modal= document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible"); 
        async function asyncdeleteMarkList(){
            //this handles the storing of new data in database already
            const response= await api.deletePlaylistById(store.listForDeletion._id);
            if (response.data.success){
                store.resetListForDeletionToNull();
            }
            //update the list in view
            store.loadIdNamePairs();
        }
        asyncdeleteMarkList();
    }
    //hide the modal, don't change list, update the listForDeletion
    store.hideDeleteListModal=function(){
        let modal= document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        store.resetListForDeletionToNull();
    }
    store.resetListForDeletionToNull=function(){
        storeReducer({
            type:GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            //reset the listForDeletion to end this deletion
            payload:null
       })
    }

    //function used for song edition
    //add a new song
    store.addNewSong=function(){
        let newSong={title:"Untitled",artist:"Unknown" ,youTubeId:"dQw4w9WgXcQ"};
        async function asyncAddNewSong(){
            store.currentList.songs.push(newSong)
            //this handles the storing of new data in database already
            const response= await api.updatePlaylistById(store.currentList._id,store.currentList);
            async function asyncsetCurrentList(){
                await store.setCurrentList(store.currentList._id)
            }
            asyncsetCurrentList();
        }
        asyncAddNewSong(); 
    }

    //move song around
    store.moveSong=function(start, end){
        let list = store.currentList;

        let temp=list.songs[start]
        list.songs[start]=list.songs[end]
        list.songs[end]=temp
        async function asyncMoveSong(){
            //this handles the storing of new data in database already
            const response= await api.updatePlaylistById(store.currentList._id,store.currentList);
            async function asyncsetCurrentList(){
                await store.setCurrentList(store.currentList._id)
            }
            asyncsetCurrentList();
        }
        asyncMoveSong(); 
    }

    //delete song functions
    store.showDeleteSongModal=function(_id){
        let selectSongDelete=store.currentList.songs[_id];
        // console.log(_id);  
        // console.log(store.currentList.songs[_id]);
        // console.log(store.currentList.songs[_id]._id);
        let modal= document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
        //store the delete song object and its index 
        storeReducer({
            type:GlobalStoreActionType.SELECT_SONG,
            payload:{
                selectSongDelete:selectSongDelete,
                selectSongDeleteIndex:_id
            }
        })       
    }
    store.deleteSong=function(){
        let modal= document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
        store.currentList.songs.splice(store.selectSongDeleteIndex,1);
        
        async function asyncUpdateAfterDeleteSong(){
            //this handles the storing of new data in database already
            const response= await api.updatePlaylistById(store.currentList._id,store.currentList);
            async function asyncsetCurrentList(){
                await store.setCurrentList(store.currentList._id)
            }
            asyncsetCurrentList();
        }
        asyncUpdateAfterDeleteSong();
    }

    store.hideDeleteSongModal=function(){
        let modal= document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }
    store.updateCurrentList=function(newCurrentList){
        storeReducer({
            type:GlobalStoreActionType.SET_CURRENT_LIST,
            payload:newCurrentList
        })
    }

    //methods for all edit song functions
    store.showEditSongModal=function(index){
        let modal= document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
        storeReducer({
            type:GlobalStoreActionType.EDIT_SONG,
            payload:{
                selectSongEdit:store.currentList.songs[index],
                selectSongEditIndex:index
            }
        })       
        store.editSongSetDefault(index);
    }
    store.editSongSetDefault=function(index){
        document.getElementById("edit-song-modal-title-textfield").value = store.currentList.songs[index].title
        document.getElementById("edit-song-modal-artist-textfield").value = store.currentList.songs[index].artist
        document.getElementById("edit-song-modal-youTubeId-textfield").value = store.currentList.songs[index].youTubeId
    }
    store.editSong=function(index,newSong){
        store.hideEditSongModal();
        console.log(newSong)
        console.log(store.selectSongEditIndex)
        store.currentList.songs.splice(store.selectSongEditIndex,1,newSong);
        console.log(store.currentList);
        //backend changes-> setcurrentlist go to backend get  data-> setcurrentlist used data to update store
        async function asyncUpdateAfterEditSong(){
            //this handles the storing of new data in database already
            const response= await api.updatePlaylistById(store.currentList._id,store.currentList);
            //reset the front-end currentlist
            async function asyncsetCurrentList(){
                await store.setCurrentList(store.currentList._id)
            }
            asyncsetCurrentList();
        }
        asyncUpdateAfterEditSong();
    }
    store.hideEditSongModal=function(){
        let modal= document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    //transaction methods for add, edit,delete, move songs to allow undo/redo
    store.addMoveSongTransaction=function(start,end){
        let transaction=new MoveSong_Transaction(store,start, end);
        tps.addTransaction(transaction);
    }
    store.AddSong_Transaction=function(){
        let transaction=new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }
    store.editSong_Transaction=function(){
        let oldSong=store.currentList.songs[store.selectSongEditIndex];
        let newSong={_id:store.currentList.songs[store.selectSongEditIndex]._id,
                    title:document.getElementById("edit-song-modal-title-textfield").value,
                    artist:document.getElementById("edit-song-modal-artist-textfield").value,
                    youTubeId:document.getElementById("edit-song-modal-youTubeId-textfield").value,
        }
        let transaction=new EditSong_Transaction(store,store.selectSongEditIndex,oldSong,newSong);
        tps.addTransaction(transaction);
    }

    //undo functions for add, delete
    store.undoAddNewSong=function(){
        storeReducer({
            type:GlobalStoreActionType.SELECT_SONG,
            payload:{
                selectSongDelete:store.currentList.songs[store.getPlaylistSize()-1],
                selectSongDeleteIndex:store.currentList.songs[store.getPlaylistSize()-1]._id
            }
        })   
        store.deleteSong();
    }
    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}