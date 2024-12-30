// import React, { Component } from "react";
// import './input-search.css';
// import UserSearchCard from "./UserSearchCard";
// import toast from 'react-hot-toast';
// import axios from 'axios';

// class SearchUser extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             searchUser: [],
//             search: "",
//             username: "",

//         };
//     }

//     componentDidMount() {
//         this.handleSearchUser(); // Gọi ngay khi component mount
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log("preState:", prevState)

//         if (prevState.search !== this.state.search) {
//             this.handleSearchUser(); // Gọi khi search thay đổi
//         }
//         // if (prevState.username !== this.state.username) {
//         //     //this.handleSearchUser(); // Gọi khi search thay đổi
//         //     console.log("username :", username)
//         // }
//         // console.log("this state:", this.state)
//         // // debugger
//         // if (prevState.username !== this.state.username) {

//         //     console.log("Username has changed:", this.state.username);
//         // }

//     }

//     handleSearchUser = async () => {
//         const URL = "http://localhost:5000/search-user";
//         try {
//             const response = await axios.post(URL, {
//                 search: this.state.search,
//             });

//             this.setState({ searchUser: response.data.data });
//             //  console.log('search user', this.state.searchUser)

//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Something went wrong");
//         }
//     };

//     handleInputChange = (e) => {
//         this.setState({ search: e.target.value });
//         // console.log("state search:", this.state)
//     };

//     handleUserClick = (user) => {

//     }

//     // };
//     render() {
//         const { searchUser, search } = this.state;
//         const { onClose } = this.props;

//         //  console.log("Username trong render:", this.state.username);



//         return (
//             <div>

//                 <input
//                     type="text"
//                     placeholder="Tìm kiếm tên người dùng"
//                     className="input-custom"
//                     onChange={this.handleInputChange}
//                     value={search}
//                 />

//                 {this.state.searchUser.length === 0 && (
//                     <div className="search-show">Không tìm thấy người dùng</div>
//                 )}

//                 {this.state.searchUser.length !== 0 &&
//                     searchUser.map((user) => {
//                         return (
//                             // Nhấn vào phần tử này sẽ gọi handleUserClick
//                             <div
//                                 key={user._id}

//                             // className="user-item"
//                             // onClick={() => this.handleUserClick(user)}

//                             >
//                                 <UserSearchCard user={user} onClose={onClose} />
//                             </div>
//                         );
//                     })}

//                 <div className="close-search" onClick={onClose}>
//                     <button>
//                         <i className="fa-solid fa-xmark"></i>
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }

// export default SearchUser;