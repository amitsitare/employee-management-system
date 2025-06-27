# Employee Management System

A full-stack web application for managing employees with a Spring Boot backend and HTML/CSS/JavaScript frontend.

## Features

- ✅ Add new employees
- ✅ View all employees
- ✅ Edit employee details
- ✅ Delete employees
- ✅ Search employees by name, email, or phone
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Toast notifications

## Technology Stack

### Backend
- **Spring Boot** - Java framework
- **Spring Data JPA** - Data persistence
- **MySQL** - Database
- **Maven** - Build tool

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **JavaScript (ES6+)** - Functionality
- **Font Awesome** - Icons

## Prerequisites

Before running the application, make sure you have:

1. **Java 11 or higher** installed
2. **Maven** installed
3. **MySQL** database running
4. **MySQL database** named `university` created

## Database Setup

1. Start your MySQL server
2. Create a database named `university`:
   ```sql
   CREATE DATABASE university;
   ```
3. Update the database credentials in `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/Emp
   spring.datasource.username=hdts
   spring.datasource.password=xxxxxx
   ```

## How to Run

### 1. Start the Backend

```bash
# Navigate to the project directory
cd em-project

# Run the Spring Boot application
./mvnw spring-boot:run

# Or if you're on Windows
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:9090`

### 2. Access the Frontend

Once the backend is running, open your web browser and navigate to:

```
http://localhost:9090
```

The frontend is served as static content from the Spring Boot application.

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/{id}` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

### Example API Usage

**Create Employee:**
```bash
curl -X POST http://localhost:9090/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'
```

**Get All Employees:**
```bash
curl http://localhost:9090/employees
```

## Project Structure

```
em-project/
├── src/
│   ├── main/
│   │   ├── java/org/configuration/em_project/
│   │   │   ├── EmProjectApplication.java      # Main application class
│   │   │   ├── EmpController.java             # REST controller
│   │   │   ├── Employee.java                  # DTO model
│   │   │   ├── EmployeeEntity.java            # JPA entity
│   │   │   ├── EmployeeRepository.java        # Data repository
│   │   │   ├── EmployeeService.java           # Service interface
│   │   │   └── EmployeeServiceImp.java        # Service implementation
│   │   └── resources/
│   │       ├── static/                        # Frontend files
│   │       │   ├── index.html                 # Main HTML page
│   │       │   ├── styles.css                 # CSS styles
│   │       │   └── script.js                  # JavaScript functionality
│   │       └── application.properties         # Configuration
│   └── test/                                  # Test files
├── pom.xml                                    # Maven configuration
└── README.md                                  # This file
```

## Features Overview

### Frontend Features
- **Modern UI Design**: Clean, responsive interface with gradient backgrounds
- **Real-time Search**: Filter employees as you type
- **Modal Editing**: Edit employees in a popup modal
- **Toast Notifications**: Success/error messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on desktop and mobile devices

### Backend Features
- **RESTful API**: Standard HTTP methods for CRUD operations
- **Data Validation**: Input validation and error handling
- **Database Integration**: MySQL with JPA/Hibernate
- **CORS Support**: Cross-origin requests enabled
- **Service Layer**: Proper separation of concerns

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Make sure MySQL is running
   - Check database credentials in `application.properties`
   - Ensure the `university` database exists

2. **Port Already in Use**
   - Change the port in `application.properties`:
     ```properties
     server.port=8080
     ```
   - Update the API_BASE_URL in `script.js` accordingly

3. **CORS Issues**
   - The controller has `@CrossOrigin(origins = "*")` annotation
   - If issues persist, check browser console for errors

4. **Frontend Not Loading**
   - Make sure you're accessing `http://localhost:9090` (not a file:// URL)
   - Check that static files are in `src/main/resources/static/`

## Future Enhancements

- Add employee photo upload
- Implement pagination for large datasets
- Add employee roles and departments
- Export employee data to CSV/PDF
- Add authentication and authorization
- Implement email notifications
- Add employee performance tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
