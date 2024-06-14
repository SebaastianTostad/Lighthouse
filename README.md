# Lighthouse

Lighthouse is a project that uses Puppeteer to automate browser actions. It's configured to log navigation events and capture the final URL of the navigated page.

## Installation 

Clone the repository to your local machine:

``` 
    git clone https://github.com/SebaastianTostad/Lighthouse.git
    cd Lighthouse
```

Then install the dependencies :
```
    npm install
```

## Dependencies
This project uses the following dependencies:

- puppeteer
- dotenv
- fs
- path
- url

## Usage/Examples
To run the script, use the following command:

```
node run-lighthouse.js
```

This will launch a Puppeteer browser instance, navigate to a specified URL, and log the final URL of the navigated page.

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

- USERNAME_APP - Your username for the application 
- PASSWORD - Your password for the application
