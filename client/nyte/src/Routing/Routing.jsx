import React from "react";
import {Routes, Route} from "react-router-dom";
import Chatroom from "../Chatroom/Chatroom";
import App from "../App";



function Routing(){

    return(
        <Routes>
            <Route element={<App/>} path="/"/>
            <Route element={<Chatroom/>} path="/chat-room"/>
        </Routes>

    )
}
export default Routing;