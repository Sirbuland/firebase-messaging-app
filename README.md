# Firebase Notification App

This project is a React + TypeScript application.

## Prerequisites

Before running the project, make sure you have the following software installed on your machine:

- Node.js v18: You can use NVM (Node Version Manager) to install Node.js v18.
  
- Java Runtime Environment (JRE)

### Starting the APPLICATION

1. Install project dependencies by navigating to the project directory in your terminal and running the following command:

   ```bash
   npm install
   ```

2. To update the environemt variable. open .env file and update it accordingly


3. Once the installation is complete, you can start the application by running the following command:

   ```bash
   npm run dev
   ```

   This command will start the development server and provide you with a local URL where you can access the application in your browser.

### Starting Firebase Emulator

1. Install the firebase CLI. (Below listed step are for intalling through NPM, please refer to the official docs for installing through other methods)
   ```bash
   npm install -g firebase-tools
   ```

2. Login into Firebase using your Google Account:
   ```bash
   firebase login
   ```

3. Start the emulator suite: 
    ```bash
    firebase emulators:start
    ```


### Sharing emulator data between teammates

When the firestore database needs to be shared between team members the following process can be used:

1. Export the current emulator database:
    ```
    firebase emulators:export ./dir
    ```

2. Import the baseline data:
    ```
    firebase emulators:start --import=./dir
    ```