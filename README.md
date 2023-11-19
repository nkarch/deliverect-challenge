# Interview Challenge for Frontend Developers

## Overview

This is a simplified wizard that goes through some basic account registration steps.

-   It is built with Vite + React with TypeScript for the frontend under `/client` and uses Express as the backend, configured in the project root
-   The form is broken into 4 separate fieldsets with a final success state.
-   Progression to the next fieldset occurs only when all fields are valid, displaying field-specific errors when attempting to proceed if invalid.
-   A back button allows for the user to return to the previous fieldset to correct any errors.
-   All progress is saved in localStorage, with localStorate items for both form data, and current panel.
-   localStorage is emptied upon successful form submission
-   Non-ok server responses return error messages, and if no items are found in either json database, a 'no items found' message will display.
-   On successful submit, payload is saved to disk as `account_{timestamp}.json` file
-   Payload structure:
    -   Currently only supports one business per account

```
        {
            "firstName": string,
            "lastName": string,
            "email": string,
            "business": {
                "name": string,
                "size": string,
                "type": "SMB" | "Midmarket" | "Enterprise"
                "posIds": number[],
                "channelIds": number[]
            }
        }
```

-   The UI is responsive for any viewport size > 320px, and optimized for accessibility.
-   Its design is inspired by the form that appears at: https://www.deliverect.com/en/request-a-demo
-   Added Dependencies:
    -   Vite: initialize framework and deps for React+TypeScript configuration
    -   Sass: enable usages of .scss files
    -   Concurrently: run frontend and backend simultaneously with a single npm command
    -   CORS: fix CORS issue when connecting to port 5000 from 5001. `server.js` has been updated accordingly

## Setup

#### NPM

-   Version used for repo:
    -   `9.4.0`

#### Node

-   Version used for repo:
    -   `18.12.1`

#### Express

-   Version used for repo:
    -   `4.18.2`

### Install

-   Run command:
    -   `npm install`
    -   This will install both server side deps and client deps

### Run Project

#### Frontend and Backend

-   Run command:
    -   `npm run dev` - this runs the server on `localhost:5000` and the frontend client on `localhost:5001` (via `npm run client` command)

#### Backend Only

-   Run command:
    -   `npm run server`

### Server Configuration

-   Server runs on - `localhost:5000`
-   Available routes
    -   GET - `/pos`
        -   Returns a list of point of sales with properties:
            -   `id`
            -   `name`
            -   `imageUrl`
    -   GET - `/channel`
        -   Returns a list of delivery channels with properties:
            -   `id`
            -   `name`
            -   `imageUrl`
    -   POST - `/account`
        -   Accepts any json payload
