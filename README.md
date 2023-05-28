# Video-streaming server

## Summary

This is a repo for me to learn video streaming server.

The video streaming server utilizes Express.js as the server framework and Pocketbase as the database. Express.js is a fast and minimalist web application framework for Node.js, while Pocketbase is a lightweight NoSQL database that offers simplicity and scalability.

- Express.js to handle HTTP requests and provide a robust and flexible API.

- Pocketbase, being a NoSQL database, offers a schema-less data model. It allows for storing and retrieving video.

## How to run server

- Run your Pocketbase database by running the following console command in the your Pocketbase directory: `./pocketbase serve`.
- Run `pnpm build`
- Run `pnpm start`
- Run `pnpm build`

## How to create Pocketbase database

[Introduction](https://pocketbase.io/docs/)

## Pocketbase Schema Example

### User (By default Pocketbase already create this schema)

| id              | username | email          | created    | updated    |
| --------------- | -------- | -------------- | ---------- | ---------- |
| 5xjase3olzim4i6 | Audi     | test@gmail.com | 1685276327 | 1685276327 |

### Videos

| id              | name       | video     | created    | updated    |
| --------------- | ---------- | --------- | ---------- | ---------- |
| 5xjase3olzim4i6 | Test video | video.mp4 | 1685276327 | 1685276327 |

## To-do list (In the future or new repo)

- Create upload API to save video
- Create an frontend page using framework
- Change the server using other framework or other programming language like Golang
