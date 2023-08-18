import readline from 'node:readline/promises';
import { Server } from 'socket.io';
import http from 'node:http';

// Creating an interface for reading and writing according to the input and output data from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = http.createServer(); // Creating a server

// Creating a server object from socket.io and connecting it to the HTTP server
const io = new Server(server, {
  cors: { // Allows access to external sources (connection between 2 domains)
    origin: true,
    methods: ['GET', 'POST']
  }
});

// Port setting and server activation
const PORT = 3001;
server.listen(PORT);

// Creating a function that accepts a question and a valid function and returns a valid answer
async function ask(question, validate) { 
  while (true) {
    const answer = await rl.question(question); // The function is called to receive input from the user
    if (validate(answer)) { // Checking the correctness of the answer
      return answer;
    }
    console.log('Invalid input, please try again.');
  }
}

// Generating normal functions for each question
function validateAltitude(input) {
  const altitude = parseInt(input);
  return !isNaN(altitude) && altitude >= 0 && altitude <= 3000;
}
function validateHIS(input) {
  const his = parseInt(input);
  return !isNaN(his) && his >= 0 && his <= 360;
}
function validateADI(input) {
  return input === '100' || input === '-100' || input === '0';
}
function validateConfirmation(input) {
  return input === 'yes' || input === 'no';
}

// Creating the question functions with ask and checking for correctness
async function askAltitude() {
  return ask('ENTER ALTITUDE (between 0 to 3000): ', validateAltitude);
}
async function askHIS() {
  return ask('ENTER HIS (between 0 to 360): ', validateHIS);
}
async function askADI() {
  return ask('ENTER ADI (choose 100 | -100 | 0): ', validateADI);
}
async function askConfirmation() {
  return ask('Send? (yes/no) ', validateConfirmation);
}

// Creating a main function (main) from which everything happens
async function main() {
  try { // input requests
    const Altitude = await askAltitude();
    const HIS = await askHIS();
    const ADI = await askADI();
    const Send = await askConfirmation();

    if (Send === 'yes') {
      io.emit('send_data', { // Send the data using an object by socket.io
        Altitude,
        HIS,
        ADI
      });
      console.log('Your message sent');
    } else {
      console.log('Message not sent.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally { // Closing the interface
    rl.close();
  }
}

main(); // Calling the function to run the program
