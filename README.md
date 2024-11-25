---

A full-stack TODO application to manage tasks with features like CRUD operations, filtering, and sorting. This application is built with a responsive UI and server-side rendering for optimal user experience.

---

## Installation and Setup

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Design

### Frontend
- The frontend is built using **Next.js App Routing**, which provides server-side rendering for optimized performance and scalability.
- React components are used to build an intuitive user interface, ensuring a seamless user experience.

### Backend
- The backend is developed with **Express.js**, a lightweight Node.js framework that simplifies server-side routing and request handling.
- User authentication is implemented using **JWT (JSON Web Tokens)** to securely manage user sessions and access controls.

---

## Application Overview

### Take-Home Assignment: Full-Stack TODO Application

#### Objective
Build a full-stack TODO application that allows users to create, read, update, and delete TODO items. The application includes additional attributes to enhance its practicality and provides a seamless and responsive user experience.

---

## Technology Stack

- **Frontend:** ReactJS, Next.js
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB

---

## Features

### Frontend
1. **User Interface:**
   - Display a list of TODO items.
   - Add new TODO items.
   - Edit existing TODO items.
   - Delete TODO items.
2. **Attributes for TODO Items:**
   - **ID:** Auto-generated.
   - **Title:** Required string.
   - **Description:** Optional string.
   - **Due Date:** Required date.
   - **Status:** Enum ("Pending", "In Review", "Completed"; default is "Pending").
   - **Assignee:** Optional string.
3. **Enhancements:**
   - Form validation for required fields.
   - Filtering by status.
   - Sorting by due date.
4. **Performance:**
   - Server-side rendering with Next.js for improved page loading times.

### Backend
1. **API Endpoints:**
   - Create, Read, Update, Delete (CRUD) operations for TODO items.
   - Input validation (e.g., non-empty title, valid due date).
   - Graceful error handling with meaningful messages.
2. **Authentication:**
   - User authentication using **JWT (JSON Web Tokens)** for secure access control.
3. **Framework:**
   - Express.js for routing and handling requests.

### Database
1. **MongoDB:**
   - Schema design with attributes like `title`, `description`, `dueDate`, `status`, and `assignee`.
   - Efficient querying for filtering and sorting TODO items.

---

## Interaction Flow

- **Frontend to Backend:** API calls are used to perform CRUD operations.
- **Validation:** Consistent validation on both frontend and backend ensures data integrity.

---

## Bonus Features Implemented
1. **User Authentication:**
   - Secure user authentication using JWT.
   - Each user manages their own TODO list.
2. **Bulk Actions:**
   - Delete multiple TODO items simultaneously.


---


## Contribution
Feel free to fork this repository and submit pull requests to improve the application.

---

### Advanced Features to Enhance the TODO Application

1. **Dark Mode/Theme Support:**
   - Implement a toggle for light and dark themes.
   - Save user preferences using local storage or a database.

2. **Reminders and Notifications:**
   - Enable users to set reminders for tasks.
   - Send email notifications or browser push notifications for upcoming due dates.

3. **Search Functionality:**
   - Add a search bar to quickly find tasks by title, description, or tags.

4. **Progress Tracking:**
   - Display a progress bar for tasks (e.g., based on completed subtasks or task status).
   - Include a dashboard view to track the number of tasks completed and pending.

5. **Offline Support:**
    - Implement offline functionality using service workers or IndexedDB.
    - Sync changes made offline with the server when the user reconnects.

6. **Analytics and Insights:**
    - Generate reports on task completion rates and productivity trends.
    - Provide insights into how users manage their time and tasks.

---
