// import packages
import React, {Component} from 'react';
//import socketIOClient from 'socket.io-client'; Making the App component
class MyStocks extends Component {
    constructor() {
        super()

        /*this.state = {
            endpoint: "http://localhost:3000" // this is where we are connecting to with sockets
        }*/
    }

    // method for emitting a socket.io event
    send = () => {

       
        // const socket = socketIOClient(this.state.endpoint); const socket =
        // socketIOClient('https://ws-api.iextrading.com/1.0/tops'); this emits an event
        // to the socket (your server) with an argument of 'red' you can make the
        // argument any color you would like, or any kind of data you want to send.
        // socket.emit('change color', 'red') socket.emit('change color', 'red',
        // 'yellow') | you can have multiple arguments
    }

    // render method that renders in code if the state is updated
    render() {

         const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/last');

socket.on('connect', () => {
  socket.emit('subscribe', 'snap')
})

       /* // Listen to the channel's messages
        socket.on('message', message => console.log(message));

        // Connect to the channel
        socket.on('connect', () => {

            // Subscribe to topics (i.e. appl,fb,aig+)
            socket.emit('subscribe', 'fb')

            // Unsubscribe from topics (i.e. aig+)
           // socket.emit('unsubscribe', 'aig+');
        })
        socket.on('disconnect', () => console.log('Disconnected.'))*/
        // Import socket.io with a connection to a channel (i.e. tops) Disconnect from
        // the channel
        /*socket.on('disconnect', () => console.log('Disconnected.'))
    // Within the render method, we will be checking for any sockets.
    // We do it in the render method because it is ran very often.
  //  const socket = socketIOClient(this.state.endpoint)
    const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');

    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument
    socket.on('change color', (color) => {
      // setting the color of our button
      console.log('event received');
      document.body.style.backgroundColor = color
    })*/

        return (
            <div class="myStocks">
                <p>Saisir les stocks à surveiller</p>
                <input type="text" value=""/>
                <button onClick={() => this.send()}>valider</button>

            </div>
        )
    }
}

export default MyStocks;
