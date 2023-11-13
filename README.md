# Google Auth and Sequalize Starter Kit

## Local Quickstart

### 1. Create Google Auth Application

https://developers.google.com/identity/sign-in/web/sign-in

### 2. Setup

Setup the environment variables. The following are needed:

- LOG_LEVEL (debug)
- CLIENT_ID (from previous step)
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_NAME
- DB_HOST
- DB_PORT (5432)
- NODE_ENV (development)

### 3. Migrate the database

- run `npx sequelize-cli db:migrate`
- run `NODE_ENV=test npx sequelize-cli db:migrate`

### 4. Run the applications

- cd to the root folder
- run `npm run dev`

### 5. Test

- cd to the root folder
- run `npm run test`

## Developer Guide
