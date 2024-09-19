Epic: Task Management System
User Stories
Story 1: Set Up the Backend with Express and Database Connection
Description: As a developer, I need to set up the backend server using Express and connect it to a database (e.g., MongoDB, Parse) to store tasks persistently.
Backend Tasks:
Initialize a Node.js + Express project.
Install necessary dependencies (express, mongoose for MongoDB, body-parser).
We are not hosting the database locally so we’ll use Back4app to Set up a database in Parse and create a database named task-manager.
Establish a connection to the database in the backend server using parseConfig file including PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, PARSE_MASTER_KEY, PARSE_SERVER_URL.
Acceptance Criteria:
The backend server connects to the database successfully.
The server is ready to handle CRUD operations on the tasks collection/table using interface.

Story 2: Implement Database Models and CRUD Operations (Backend)
Description: As a developer, I need to implement CRUD operations using database models to persist task data.
Backend Tasks:
Define a Task model/schema: Interfaces or types
Implement API endpoints to interact with the database:
GET /tasks - Retrieve all tasks from the database.
POST /tasks - Add a new task to the database.
PUT /tasks/:id - Update a task in the database.
DELETE /tasks/:id - Delete a task from the database.
Add error handling for database operations (e.g., failed queries, validation errors).
Acceptance Criteria:
Tasks are persisted in the database.
API endpoints interact with the database, performing CRUD operations successfully.
Errors are handled gracefully with appropriate HTTP status codes.

Story 3: Create the Frontend with React and Typescript.
Description: As a developer, I need the frontend architecture to have components to list the tasks and create tasks.
Frontend Tasks:
Setup the Frontend project with React, Typescript, and Material UI.
A form to create the task and on the add button it will add the task in a state on the Frontend.
Create a component to list the task in the UI.
Acceptance Criteria:
A Frontend application to have a functionality to create and list the tasks.
The UI reflects the options to edit and delete the task.

Story 3: Create API Service on Frontend to Use Backend with Database
Description: As a developer, I need to create the API service in the frontend to communicate with the enhanced backend that now interacts with the database.
Frontend Tasks:
Create taskAPI.ts to use the existing backend endpoints (/tasks) for all CRUD operations.
Ensure that all API calls handle responses correctly and console log based on database changes.
Acceptance Criteria:
The frontend API service correctly communicates with the backend.
The frontend reflects changes in the database (e.g., adding, editing, and deleting tasks).

Story 4: Implement Task Creation with Database Integration (Frontend and Backend)
Description: As a user, I want to create a new task and have it stored in the database, so it persists across sessions.
Backend Tasks:
Make sure the POST /tasks endpoint to save new tasks in the database.
Ensure the new task is saved with a unique identifier and timestamps (createdAt, updatedAt).
Frontend Tasks:
Use the createTask API function to add new tasks via the TaskForm component.
Show a toast notification on successful creation or error.
Update the task list after a task is created.
Acceptance Criteria:
New tasks are saved in the database and persist across sessions.
The frontend shows the updated task list reflecting the newly added task.

Story 5: Implement Task Retrieval from Database (Frontend and Backend)
Description: As a user, I want to see all my tasks retrieved from the database, so I can view my tasks after refreshing the page or returning later.
Backend Tasks:
Make sure the GET /tasks endpoint to retrieve tasks from the database.
Frontend Tasks:
Use the fetchTasks API function in App.tsx to load tasks from the database on component renders.
Ensure tasks are displayed in the TaskList component.
Show an error notification if task retrieval fails.
Acceptance Criteria:
The task list is populated from the database on page load.
Tasks persist between page refreshes or user sessions.
The frontend handles errors and shows appropriate feedback.

Story 6: Implement Task Editing with Database Integration (Frontend and Backend)
Description: As a user, I want to update a task's title and have the change reflected in the database, so my data is accurate.
Backend Tasks:
Make sure the PUT /tasks/:id endpoint to update tasks in the database.
Ensure the updatedAt field is updated when a task is modified.
Frontend Tasks:
Use the updateTask API function to edit tasks via the EditTaskDialog component.
Show a toast notification on successful update or error.
Update the task list to reflect changes.
Acceptance Criteria:
Edited tasks are updated in the database.
The frontend shows the updated task list with the edited task title.
Appropriate feedback is provided for successful or failed operations.


Story 7: Implement Task Deletion with Database Integration (Frontend and Backend)
Description: As a user, I want to delete tasks and have them removed from the database.
Backend Tasks:
Make sure the DELETE /tasks/:id endpoint to delete tasks from the database.
Frontend Tasks:
Use the deleteTask API function to delete tasks via the TaskList component.
Show a toast notification on successful deletion or error.
Remove the deleted task from the task list.
Acceptance Criteria:
Deleted tasks are removed from the database.
The task list on the frontend reflects the deletion immediately.
Users receive feedback on successful or failed deletion attempts.

Story 8: Write the Unit test for the functionalities on frontend.
Description: As a developer, I want to create the unit tests for the functionalities on the frontend code.
Frontend Tasks:
Install the jest and node modules for testing  on the frontend. Create a jest.config.
Create a separate file App.test.tsx for writing the test for creating task features.
Acceptance Criteria:
The test should fulfill the functionality of creating a task.

