//Express initializes app to be a function handler
//that you can supply to an HTTP server (second line)
var app = require('express')();
var http = require('http').Server(app);
/*Initialize new instance of socket.io by passing the http
(the HTTP server) object.*/
var io = require('socket.io')(http);
const PORT = 8000;
let userList = []; 

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log("user disconnected");
        console.log(socket.id);
    });
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    /*Expect (data) to consist of data.status (true/false); 
    If data.status == true, then data will also contain
    data.username.*/
    socket.on('typing', (data) => {
        io.emit('typing', (data));
    })

    socket.on('user joined', (username) => {
        userList.push(username);
        let data = {userList: userList, username: username}
        io.emit('user joined', data); 
    })

    socket.on('user left', (username) => {
        let index = userList.indexOf(username);
        if (index > -1) {
            userList.splice(index, 1);
        }
        let data = {userList: userList, username: username}
        io.emit('user left', data);
    })

});

http.listen(PORT, () => {
    console.log('listening on port ', PORT);
});