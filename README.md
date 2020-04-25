# Undef backend

Repo for Undef API

## Gettings started

`npm install && npm start`

## Models

- User
- Chat

## Routes & Methods
## Confirmed routes and methods
- register `/api/registration`
- login `/api/login`
- __(protected)__ chats `/chats` 


## To Be Decided (also designed) 

- logout `/logout`
- burn `/burn`

> if someone tries to access your account,
> burn is called on your user
> and all that relates to the user is burned.

- **TBD** chat `/chats/:id/` (protected)
- **TBD** messages `/chats/:id/messages` (protected)