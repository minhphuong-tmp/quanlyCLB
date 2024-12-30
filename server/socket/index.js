import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import getUserDetailsFromId from './getUserDetailsFromId.js';
import Users from "../models/user.model.js";
import { ConversationModel, MessageModel } from "../models/ConversationModel.js";


const app = express();

/***socket connection */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

const onlineUser = new Set();

io.on('connection', async (socket) => {
    console.log("connect user:", socket.id);
    const id = socket.handshake.auth.id;


    //current user details 
    const user = await getUserDetailsFromId(id);

    //console.log(user._id.toHexString());
    // console.log('user', user)
    // console.log('user', user._id)




    //create a room
    socket.join(user._id.toString());
    onlineUser.add(user._id).toString();


    io.emit('onlineUser', Array.from(onlineUser));
    //console.log("onlineuserarray:", onlineUser)

    socket.on('message-page', async (username) => {

        console.log('userid123456:', username);

        const userDetails = await Users.findById(username).select("-password");

        console.log("userDetails:", userDetails);

        const payload = {
            _id: userDetails._id,
            username: userDetails.username,
            lop: userDetails.lop,

        }
        //console.log('payload:', payload)
        socket.emit('message-page', payload)

        //get previous message
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: user._id, receiver: username },
                { sender: username, receiver: user._id }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        if (getConversationMessage && getConversationMessage.messages) {
            socket.emit('message', getConversationMessage.messages);
        } else {
            console.error('getConversationMessage is null or messages not found');
            // Xử lý trường hợp không có dữ liệu ở đây
        }



    });

    socket.on('new message', async (data) => {

        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        })
        // console.log('conservation:', conversation)

        //if conversation is not available
        if (!conversation) {
            const createConversation = await ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save()
        }

        const message = new MessageModel({
            text: data.text,
            msgByUserId: data?.msgByUserId,
        })
        const saveMessage = await message.save()

        const updateConversation = await ConversationModel.updateOne({ _id: conversation?._id }, {
            "$push": { messages: saveMessage?._id }
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        io.to(data?.sender).emit('message', getConversationMessage?.messages || [])
        io.to(data?.receiver).emit('message', getConversationMessage?.messages || [])

    })

    socket.on('sidebar', async (currentUserId) => {
        console.log("current user 123123123:", currentUserId)
        const currentUserConversation = await ConversationModel.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver')

        console.log('currenUserConversation', currentUserConversation)

        const conversation = currentUserConversation.map((conv) => {

            return {
                _id: conv._id,
                sender: conv.sender,
                receiver: conv.receiver,
                lastMsg: conv.messages[conv.messages.length - 1]
            }
        })

        socket.emit('conversation', conversation)



    })




    socket.on('disconnect', () => {

        onlineUser.delete(user._id);
        console.log("disconnect user:", socket.id);
    });
});

// Export app and server correctly for ES modules
export { app, server };
