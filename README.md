# Part of Speech

This is a web-based interactive activity that helps students practice categorizing words according to their part of speech. It uses React.js for the client side and node.js with Express.js for the server side.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies for the server side, navigate to the `server` folder and run:

npm install

Copy

To install the dependencies for the client side, navigate to the `client` folder and run:

npm install

Copy

## Usage

To start the server, navigate to the `server` folder and run:

npm start

Copy

This will start the server on port 3000.

To start the client, navigate to the `client` folder and run:

npm start

sql_more
Copy

This will start the client on port 3001.

## Endpoints

The server provides the following endpoints:

- `/words` (GET): Provides an endpoint that returns a list of 10 objects selected randomly from the "wordsList" (check `wordsList` in `TestData.json`). The array includes at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
- `/rank` (POST): Provides an endpoint that takes the final score in the request body, and responds back with the rank% rounded to the nearest hundredth. The rank represents the percentage of scores (check `scoresList` in `TestData.json`) below the given final score.

The client interacts with the `/words` endpoint to fetch the words list and display it to the user. It also sends a POST request to the `/rank` endpoint to get the student's rank based on their score % provided in the request body.

## Testing

To run the test suite for the server side, navigate to the `server` folder and run:

npm test

Copy

This will run the test suite using Jest.

To run the test suite for the client side, navigate to the `client` folder and run:

npm test

livecodeserver
Copy

This will run the test suite using Jest and Enzyme.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
