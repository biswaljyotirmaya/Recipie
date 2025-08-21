# Recipe Explorer

A full-stack web application for browsing and searching recipes with a React frontend and Spring Boot backend.

## Prerequisites

Before running this application, ensure you have the following installed:
- Node.js (v14 or higher)
- Java 17 or later
- MongoDB (v4.4 or later)
- Maven (for backend)
- Git

## Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/biswaljyotirmaya/Recipie.git
cd Recipie
```

### 2. Setup Backend

#### Navigate to backend directory
```bash
cd backend
```

#### Build the project with Maven
```bash
mvn clean install
```

#### Ensure MongoDB is running
```bash
# On macOS with Homebrew:
brew services start mongodb/brew/mongodb-community

# On Ubuntu:
sudo systemctl start mongod

# On Windows:
# Start MongoDB service from Services or run mongod.exe
```

#### Run the Spring Boot application
```bash
mvn spring-boot:run
```

The backend server will start on http://localhost:4041

### 3. Setup Frontend

#### Open a new terminal and navigate to frontend directory
```bash
cd ../frontend
```

#### Install dependencies
```bash
npm install
```

#### Start the React development server
```bash
npm start
```

The frontend will start on http://localhost:3000

### 4. Verify the Application

1. Open your browser and go to http://localhost:3000
2. You should see the Recipe Explorer application
3. The backend should be running on http://localhost:4041

## Project Structure

```
Recipie/
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/jb/
│   │   ├── config/         # CORS configuration
│   │   ├── controller/     # REST API endpoints
│   │   ├── entity/         # Data models
│   │   ├── repository/     # MongoDB repositories
│   │   ├── service/        # Business logic
│   │   └── Application.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── App.js
│   ├── package.json
│   └── public/
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get paginated recipes |
| GET | `/api/recipes/search` | Search recipes with filters |
| GET | `/api/recipes/{id}` | Get recipe by ID |
| GET | `/api/recipes/cuisines` | Get all cuisines |
| GET | `/api/recipes/fields` | Get all available fields |
| GET | `/api/recipes/count` | Get total recipe count |

## Features

- Recipe browsing with pagination
- Advanced search and filtering by:
  - Recipe title
  - Cuisine type
  - Rating range
  - Preparation time
  - Calorie count
- Responsive design for all devices
- Detailed recipe view modal with ingredients and instructions
- Clean and modern UI with Tailwind CSS

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `backend/src/main/resources/application.properties`

2. **Port Already in Use**
   - Backend runs on port 4041, frontend on port 3000
   - Change ports in configuration files if needed

3. **Java Version Issues**
   - Verify Java version: `java -version`
   - Requires Java 17 or higher

4. **Dependency Issues**
   - For backend: `mvn clean install`
   - For frontend: `npm install`

5. **CORS Errors**
   - Check CORS configuration in `CorsConfig.java`
   - Ensure backend is running on port 4041

### Data Loading
The application will automatically load recipe data from `US_recipes.json` on first startup. Ensure this file is in the backend resources directory.

## Support

If you encounter any issues, please check:
1. All prerequisites are installed
2. MongoDB is running
3. Ports 4041 and 3000 are available
4. Java version is 17+

Enjoy exploring recipes! 🍳
