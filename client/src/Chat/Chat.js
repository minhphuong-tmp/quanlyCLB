
// import React from "react";
// import { ChatEngine } from "react-chat-engine";
// import { PeopleSettings } from "react-chat-engine";
// export const Chat = () => {
//   const username = sessionStorage.getItem("msv");
//   return (
//     <div style={{ overflow: "hidden" }}>
//       <ChatEngine
//         height="100vh"
//         projectID="458c42a0-f2ff-4ffa-bafa-b0f1066903ee"
//         userName={username}
//         userSecret={username}

//       />
//     </div>
//   );
// };

/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Selectbar from "../ListStudent/Components/Selectbar";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {


    }




    render() {
        return (
            <div className='w-full bg-red-500'>

                <Selectbar />


            </div>

        )


    }
}

export default Chat;
