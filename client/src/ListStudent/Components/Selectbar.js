import React, { Component } from 'react';
import './Selectbar.css';
import SearchUser from './SearchUser';
import io from 'socket.io-client';
import { setSocketConnection, setOnlineUser } from '../../redux/userSlice';
import { connect } from "react-redux";

class Selectbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSearchUser: false,
        };
        this.socketConnection = null;
    }

    componentDidMount() {
        const userId = sessionStorage.getItem('userId2'); // Lấy userId từ sessionStorage

        /***socket connection */
        this.socketConnection = io("http://localhost:5000", {
            auth: {
                id: sessionStorage.getItem('userId2')
            }
        });
        // this.setState(this.socketConnection)

        this.socketConnection.on('connect', () => {
            console.log("Socket connection established:", this.socketConnection);
            this.props.setSocketConnection(this.socketConnection);  // Dispatch kết nối socket vào Redux
        });
    }

    componentWillUnmount() {
        if (this.props.socketConnection) {
            this.props.socketConnection.disconnect();
            console.log('Socket connection disconnected');
        }
    }

    toggleSearchUser = () => {

        this.setState(prevState => ({
            openSearchUser: !prevState.openSearchUser,
        }));
    };
    // handleUserClick = (username) => {
    //     console.log('Selected username:', username);
    //     this.setState({
    //         selectedUsername: username, // Cập nhật username được chọn
    //         openSearchUser: false, // Đóng modal SearchUser sau khi chọn người dùng
    //     });
    // };





    render() {
        const { openSearchUser } = this.state;
        const { onUserSelect } = this.props;

        return (
            <div className="Select-bar-container">
                <div className="search-icon" title='add friend' onClick={this.toggleSearchUser}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="message-container">
                    <div className="message">Cuộc trò chuyện</div>
                    <div className="conservation">Tin nhắn</div>
                </div>
                {/* <div className="history-chat">
                    History chat
                </div> */}

                {/* *search user */}
                {openSearchUser && <SearchUser onClose={this.toggleSearchUser} onUserSelect={onUserSelect} />}



            </div>
        );
    }
}

const mapDispatchToProps = {
    setSocketConnection,
    setOnlineUser,
};

export default connect(null, mapDispatchToProps)(Selectbar);
