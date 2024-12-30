import React, { Children } from "react";
import Home from "./HomePage/Component/Home";
import Notification from "./HomePage/Component/Notification";
import Chat from "./Chat/Chat";
import ListStudent from "./ListStudent/ListStudent";
import Chart from "./Chart/Chart";
import AddForm from "./ListStudent/Components/AddForm";
import InfoStudent from "./ListStudent/Components/InfoStudent";
import ImportData from "./ListStudent/Components/ImportData";
import Profile from "./Profile/Profile";
import ChangePassword from "./Profile/ChangePassword";
import UserSearchCard from "./ListStudent/Components/UserSearchCard";
import SearchUser from "./ListStudent/Components/SearchUser";
import MessagePage from "./ListStudent/Components/MessagePage";

const routes = [
  {
    path: "/home/notification",
    exact: true,
    main: () => <Notification />,
  },

  // {
  //   path: "/home/chat",
  //   exact: true,
  //   main: () => <Chat />,
  //   children:[
  //     {
  //       path:':username'
  //       element: <Chat />
  //     }
  //   ]
  // },


  {
    path: "/home/list-students",
    exact: true,
    main: () => <ListStudent />,
  },
  {
    path: "/home/chart",
    exact: true,
    main: () => <Chart />,
  },
  {
    path: "/home/list-students/add",
    exact: true,
    main: () => <AddForm />,
  },
  {
    path: "/home/list-students/update/:id",
    exact: true,
    main: ({ match }) => <InfoStudent match={match} />,
  },




  {
    path: "/home/chat",
    exact: true,
    main: () => <MessagePage />,
  },





  // {
  //   path: "/home/chat",
  //   exact: true,
  //   main: ({ match }) => <Chat />,
  // },

  {
    path: "/home/chat/:username",
    exact: false, // Cho phép xử lý dynamic URL
    main: ({ match }) => {
      const userId = match.params.userId; // Lấy userId từ URL
      return userId ? <MessagePage username={userId} /> : <MessagePage />;
    },
  },


  {
    path: "/home/list-students/import-data",
    exact: true,
    main: () => <ImportData />,
  },
  {
    path: "/home/profile",
    exact: true,
    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/change-password",
    exact: true,
    main: () => <ChangePassword />,
  },
];

export default routes;
