import './App.css';
import { React, useContext, useState } from 'react'
import { GlobalStoreContext } from './store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar,DeleteListModal,DeleteSongModal, EditSongModal } from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const { store } = useContext(GlobalStoreContext);
    const ctrlPress = false;
    const handleAppKeyDown = (event) => {
        let CTRL_KEY_CODE = "17";
        if (event.which === CTRL_KEY_CODE) {
            ctrlPress = true;
        }
        else if (event.key.toLowerCase() === "z") {
            if (!ctrlPress) {
                store.undo();
            }
        }
        else if (event.key.toLowerCase() === "y") {
            if (!ctrlPress) {
                store.redo();
            }
        }
    }
    const handleAppKeyUp = (event) => {
        if (event.which === "17")
            ctrlPress = false;
    }

    document.onkeydown = handleAppKeyDown;
    document.onkeyup = handleAppKeyUp;
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
            <DeleteListModal/>
            <DeleteSongModal/>
            <EditSongModal/>
        </Router>
    )
}

export default App