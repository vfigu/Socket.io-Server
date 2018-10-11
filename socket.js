var app = require('http').createServer(); // create HTTP server
var io = require('socket.io')(app, {path: '/socket.io'}); // bind Socket to HTTP server
var port = 3000;
app.listen(3000); // listen on port 3000
console.log('Listening for connections on port 3000');

io.on('connection', function(socket) {
    console.log('Socket connected');
    socket.emit('fromServer', {id: port}); // send message fromServer to client
    socket.on('fromClient', function(data) { // listen for fromClient message
        console.log('Connected to Client ' + data.id);
        socket.emit('Handshake'); // send message fromServer to client
    });

    socket.on('hello', function(data) { // listen for fromClient message
        console.log('Client ' + data.id + ': ' + data.msg);
        setTimeout(function(){
            socket.emit('hi', {msg: 'Hi there'})
        }, 2500);
    });
    socket.on('hru', function(data) { // listen for fromClient message
        console.log('Client ' + data.id + ': ' + data.msg);
        setTimeout(function(){
            socket.emit('great', {msg: 'Great'})
        }, 2500);
    });
    socket.on('Handshake', function() { // listen for fromServer message
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });
});

