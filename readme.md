socket

//receving data from the frontend or client
// socket.on("texted", ({ message }) => {
// console.log("message: ", message);
// });

//sending data to frontend
// io.emit("welcome", "hello there");

//after every connection , take userId , socketId from user

// //socketio
// const io = socketIO(server);

// let users = [];

// const addUSer = (userId, receiverId, socketId) => {
// !users.some((user) => user.userId === userId) &&
// users.push({ userId, receiverId, socketId });
// };

// const getUser = (userId) => {
// return users.find((user) => user.userId === userId);
// };

// //circuit
// io.on("connection", (socket) => {
// console.log("new connection");

// //take userId and socket from user
// socket.on("addUser", (userId, receiverId) => {
// addUSer(userId, receiverId, socket.id);

// io.emit("getUsers", users);
// });

// //send and get message
// socket.on("sendMessage", ({ senderId, receiverId, text }) => {
// const user = getUser(receiverId);
// io.to(users.socketId).emit("getMessage", {
// senderId,
// text,
// });
// });
// });
