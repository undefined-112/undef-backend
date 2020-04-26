# Undef backend

Repo for Undef api

## Gettings started

`npm install && npm start`

## SSL
Self signed SSL certificates atm. Need to look into this.

## Models

- User
- Chat

## Routes

### Non logged in routes

- register `/api/registration`
- login `/api/login`
- logout `/logout`
- burn `/burn`

> if someone tries to access your account,
> burn is called on your user
> and all that relates to the user is burned.

#### Protected route

- chats `/chats`
- chat `/chats/:id/`
- messages `/chats/:id/messages`
