import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
class UserSearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user, // Lưu user vào state khi khởi tạo component
            username: ""
        };
    }

    // componentDidMount() {

    // }

    // componentDidUpdate(prevState) {

    // }


    render() {
        const { user } = this.state;

        return (
            <Link
                to={"/home/chat/" + user._id}
                onClick={(e) => {
                    e.stopPropagation();
                    if (this.props.onClose) {
                        this.props.onClose(); // Gọi hàm onClose nếu được truyền
                    }
                    
                }}
                style={{
                    display: "flex", 
                    alignItems: "center",
                    gap: "12px", 
                    padding: "8px",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    border: "1px solid transparent", 
                    borderBottom: "1px solid #E2E8F0",
                    borderRadius: "4px",
                    cursor: "pointer", 
                    transition: "border-color 0.2s ease",
                }}
            >
                <div>
                    <div
                        style={{
                            fontWeight: 600, // font-semibold
                            whiteSpace: "nowrap", // không xuống dòng
                            overflow: "hidden", // cắt phần dư
                            textOverflow: "ellipsis", // hiển thị dấu "..." nếu quá dài
                            lineHeight: "1.5", // khoảng cách dòng
                        }}
                    >
                        {user.username}
                    </div>
                </div>
            </Link>
        );
    }
}

export default UserSearchCard;
