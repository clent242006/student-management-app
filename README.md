# Student Management App

A simple Student Management Web Application built using **Node.js, Express.js, EJS, and JSON** as a local database. The application is also **Dockerized** for easy deployment and portability.

## Project Information

**Project:** Student Management App
**Purpose:** Midterm Project
**Technologies:** JSON, Express.js, EJS, Docker
**Database:** JSON file (local database)

## Features

* View all students
* Add a new student
* Edit student information
* Delete a student
* Store student records using a JSON file
* Server-side rendering using EJS
* Run the application using Docker

## Tech Stack

### JSON

Used as the local database for storing student records.

### Express.js

Used to create the web server and handle application routes and HTTP requests.

### EJS

Used as the template engine to generate dynamic HTML pages.

### Docker

Used to containerize the application so it can run consistently in a Docker environment.

## Project Structure

```text
student-management-app/
│
├── data/
│   └── students.json
│
├── public/
│   └── style.css
│
├── views/
│   ├── index.ejs
│   ├── add.ejs
│   └── edit.ejs
│
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## Requirements

Before running the project, make sure you have:

* Node.js
* npm
* Docker Desktop
* Git

## Running the Application Locally

### 1. Clone the repository

```bash
git clone https://github.com/clent242006/student-management-app.git
```

### 2. Open the project

```bash
cd student-management-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Running with Docker

### 1. Build the Docker image

```bash
docker build -t student-management-app .
```

### 2. Run the Docker container

```bash
docker run -d -p 3000:3000 --name student-management-app student-management-app
```

### 3. Open the application

Go to:

```text
http://localhost:3000
```

### 4. Check the running container

```bash
docker ps
```

### 5. Stop the container

```bash
docker stop student-management-app
```

### 6. Start the container again

```bash
docker start student-management-app
```

## API / Routes

| Method | Route         | Description                  |
| ------ | ------------- | ---------------------------- |
| GET    | `/`           | Display all students         |
| GET    | `/add`        | Display the add student form |
| POST   | `/add`        | Add a new student            |
| GET    | `/edit/:id`   | Display the edit form        |
| POST   | `/edit/:id`   | Update student information   |
| POST   | `/delete/:id` | Delete a student             |

## Data Storage

Student information is stored locally in:

```text
data/students.json
```

Example:

```json
[
  {
    "id": 1,
    "name": "Juan Dela Cruz",
    "course": "BSIT",
    "year": 2
  }
]
```

## Docker Configuration

The application uses the official Node.js Alpine image:

```dockerfile
FROM node:20-alpine
```

The Docker container exposes port:

```text
3000
```

The application starts using:

```dockerfile
CMD ["npm", "start"]
```

## GitHub Repository

Repository:

https://github.com/clent242006/student-management-app

## Authors

**Student Management App**
Created as a midterm project for:

* Advanced Database
* Integrative Programming
* Web Systems

## License

This project was created for educational purposes.
