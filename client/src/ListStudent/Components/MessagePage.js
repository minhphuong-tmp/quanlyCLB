/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Selectbar from "./Selectbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { setSocketConnection } from "../../redux/userSlice"
import moment from "moment/moment";
import "./MessagePage.css"
import { BiFontSize } from "react-icons/bi";
import { RiFontSize } from "react-icons/ri";
class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            dataUser: JSON.parse(localStorage.getItem("dataUser")) || {
                name: "",
                email: "",
                _id: ""
            },
            message: {
                text: "", 

            },
            allMessages: [],


        };
        this.messagesEndRef = React.createRef();
    }


    componentDidMount() {

        const { match, socketConnection } = this.props;
        const userId2 = sessionStorage.getItem("userId2");
        console.log("userId2 from sessionStorage:", userId2);
        // const paramusername = match?.params?.username;
        const paramusername = match?.params?.username || localStorage.getItem("paramusername");


        // console.log("param username:", paramusername);

        // console.log("Username from Redux:", this.state);



        // Lưu username vào state
        this.setState({ paramusername });
        //this.setState({ socketConnection });
        this.setState({ socketConnection });

        // Gửi sự kiện qua socket nếu socketConnection và username tồn tại
        if (socketConnection && paramusername && userId2) {

            this.sendSocketEvent(paramusername, socketConnection, userId2);
            // this.listenSocketEven(username, this.props.socketConnection);
        }
        //  debugger
    }

    componentDidUpdate(prevProps, prevState) {
        const { paramusername, allMessages } = this.state;
        const { dataUser, socketConnection } = this.state;
        const userId2 = sessionStorage.getItem("userId2");
        // const {socketConnection}= this.props;

        if (prevState.paramusername !== paramusername) {
            console.log("paramusername updated:", paramusername);
            localStorage.setItem("paramusername", paramusername);

            // Gửi sự kiện qua socket
            if (socketConnection && paramusername && userId2) {
                this.sendSocketEvent(paramusername, socketConnection, userId2);
            }
        }
        if (prevState.dataUser !== dataUser) {
            localStorage.setItem("dataUser", JSON.stringify(dataUser));

        }



        if (prevState.socketConnection !== socketConnection) {




            if (socketConnection && paramusername) {
                this.sendSocketEvent(paramusername, socketConnection);

            }

            // this.sendSocketEvent(paramusername, socketConnection);
        }
        if (prevState.allMessages !== allMessages) {
            this.scrollToBottom();
        }

    }
    scrollToBottom = () => {
        if (this.messagesEndRef.current) {
            this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    sendSocketEvent(paramusername, socketConnection, userId2) {
        console.log("socketConnection:", socketConnection);  // Kiểm tra socketConnection
        socketConnection.emit('message-page', paramusername);


        // Lắng nghe sự kiện từ server
        socketConnection.on('message-page', (data) => {
            this.setState({ dataUser: data })

        });


        // Lắng nghe sự kiện 'message' để nhận tin nhắn mới từ server
        socketConnection.on('message', (messages) => {
            // console.log("Nhận tin nhắn:", messages);
            this.setState({ allMessages: messages })

        });

        socketConnection.emit('sidebar', userId2)
        socketConnection.on('conversation', async (data) => {
            //console.log("conversation:", data);

            // Xử lý dữ liệu cuộc trò chuyện
            const conversationUserData = data.map((conversationUser) => {
                // console.log('data conversationUserData', conversationUser.lastMsg.text)
                let lastMessage = null;

                lastMessage = conversationUser.lastMsg.text;

                // console.log('Last Message:', lastMessage);

                if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                    return {
                        ...conversationUser,
                        userDetails: conversationUser?.sender,
                        lastMessage,
                    };
                } else if (conversationUser?.receiver?._id !== userId2) {
                    return {
                        ...conversationUser,
                        userDetails: conversationUser.receiver,
                        lastMessage,
                    };
                } else {
                    return {
                        ...conversationUser,
                        userDetails: conversationUser.sender,
                        lastMessage,
                    };
                }
            });

            this.setState({ conversationUserData });
        });


    }
    handleOnChange = (e) => {

        const { value } = e.target;
        this.setState((prevState) => ({
            message: {
                ...prevState.message,
                text: value
            }
        }));

    };

    handleSendMessage = (e) => {
        e.preventDefault()
        const { socketConnection } = this.props;
        if (this.state.message.text) {
            if (socketConnection) {
                socketConnection.emit('new message', {
                    sender: sessionStorage.getItem("userId2"),
                    receiver: this.state.paramusername,
                    text: this.state.message.text,

                    msgByUserId: sessionStorage.getItem("userId2"),
                })

            }
            this.setState((prevState) => ({
                message: {
                    ...prevState.message,
                    text: "", // Làm rỗng trường text
                },
            }));
        }

    }
    // handleUsernameClick = (username) => {
    //     // Sử dụng useNavigate để điều hướng đến trang chat với username
    //     this.props.history.push(`/home/chat/${username}`);
    // }



    render() {
        const { paramusername, allMessages, conversationUserData } = this.state;
        const { dataUser } = this.state;



        const { socketConnection, } = this.props;

        return (
            <div className="chat-page">

                <div className="user-search-bar">
                <Selectbar onUserSelect={(_id) => this.setState({ paramusername: _id })} />

                {/* Hiển thị username nếu có */}
                </div>

                <div className="username">
                    <p>{dataUser.username || "No username selected"}</p>

                </div>

                <div className="conversation-wrapper">
                            
                     <div className="conversation-list">
                    {conversationUserData && conversationUserData.map((conversation, index) => (
                        <div key={index} className="conversation-item" >
                            {/* //onClick={() => this.handleUsernameClick(conversation.userDetails.username)} */}
                            <p>
                                <strong>{conversation.userDetails.username}: </strong>
                                {conversation.lastMessage ? conversation.lastMessage : "No messages yet"}
                            </p>
                        </div>
                    ))}
                     </div>

             


                    {/* Hiển thị tất cả tin nhắn */}

                    <div className="messages-container">
                        {allMessages.map((msg, index) => {
                            // Kiểm tra nếu msg.msgByUserId === userId2 trong sessionStorage
                            let messageStyle = {}; // Khởi tạo style mặc định cho tin nhắn
                            let timeStyle = {color: '#fff'};    // Khởi tạo style mặc định cho thời gian

                            // Kiểm tra xem tin nhắn là của người gửi hay không
                            if (msg.msgByUserId === sessionStorage.getItem("userId2")) {
                                // Nếu là người gửi, dịch sang phải
                                messageStyle = { textAlign: 'right', margin: '4px' };
                                timeStyle = { 
                                    textAlign: 'right', 
                                    color: '#c5c5c5', margin: '4px'
                                    
                                };
                            } else {
                                // Nếu không phải người gửi, dịch sang trái
                                messageStyle = { textAlign: 'left', margin: '4px' };
                                timeStyle = {textAlign: 'left', color: '#c5c5c5', margin: '4px'};
                            }

                            return (
                                <div key={index}
                                    className="message"
                                    style={{
                                        maxWidth: '40%',
                                        width: 'fit-content',
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        padding: '6px',
                                        paddingRight: '24px',
                                        paddingLeft: '24px',
                                        margin: '4px',
                                        backgroundColor: msg.msgByUserId === sessionStorage.getItem("userId2") ? '#3498db' : '#f9f9f9',
                                        border: '1px solid #ccc',
                                        borderRadius: '32px',
                                        marginLeft: msg.msgByUserId === sessionStorage.getItem("userId2") ? 'auto' : '20px', // Căn phải nếu là người gửi
                                        marginRight: msg.msgByUserId !== sessionStorage.getItem("userId2") ? 'auto' : '20px', // Căn trái nếu không phải người gửi
                                    }}>

                                    {/* Áp dụng style cho tin nhắn */}
                                    <p style={messageStyle}>{msg.text}</p>

                                    {/* Áp dụng style cho thời gian */}
                                    <p style={timeStyle}>{moment(msg.creatAt).format('hh:mm')}</p>
                                    <div ref={this.messagesEndRef}></div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                <section>
                    <div className="texting-box">

                    {/* Gửi tin nhắn
                    send message */}
                        <form onSubmit={this.handleSendMessage}>

                        <input
                            type='text'
                            placeholder="Message..."
                            value={this.state.message.text}
                            onChange={this.handleOnChange}
                        >
                        </input>

                        <button>
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                        </form>        
                    </div>

                </section>


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    socketConnection: state.user.socketConnection, // Lấy socketConnection từ Redux
    //username: state.dataUser.username,
});

const mapDispatchToProps = {
    setSocketConnection, // Thêm action setSocketConnection để dispatch
};
// const SelectbarWithHistory = (props) => {
//     const history = useHistory();  // Sử dụng useHistory

//     return <Selectbar {...props} history={history} />;
// };
export default connect(mapStateToProps)(withRouter(MessagePage));
