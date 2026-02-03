# Backend Architecture

<cite>
**Referenced Files in This Document**
- [server.js](file://server/server.js)
- [db.js](file://server/config/db.js)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js)
- [errorHandler.js](file://server/middleware/errorHandler.js)
- [EcoScoreResult.js](file://server/models/EcoScoreResult.js)
- [ecoScore.js](file://server/routes/ecoScore.js)
- [scoreCalculator.js](file://server/utils/scoreCalculator.js)
- [package.json](file://server/package.json)
- [.env.example](file://server/.env.example)
- [api.js](file://client/src/services/api.js)
- [vite.config.js](file://client/vite.config.js)
- [.env.example](file://client/.env.example)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Security Considerations](#security-considerations)
10. [Scalability and Deployment](#scalability-and-deployment)
11. [Conclusion](#conclusion)

## Introduction
This document provides comprehensive backend architecture documentation for the Express.js server that powers the Eco Score Predictor application. It covers server initialization, middleware configuration, routing structure, MVC pattern implementation, error handling, database connectivity, environment configuration, RESTful API design, CORS configuration, security considerations, validation strategies, performance optimization, scalability, and deployment preparation.

## Project Structure
The backend follows a modular Express.js architecture with clear separation of concerns:
- Server entry point initializes Express, loads environment variables, connects to MongoDB, configures middleware, registers routes, and starts the HTTP server
- Configuration module handles database connection with robust error handling
- Controllers encapsulate business logic and coordinate between routes and models
- Models define Mongoose schemas for persistent storage
- Routes define REST endpoints and apply validation middleware
- Utilities contain reusable calculation logic
- Middleware provides centralized error handling
- Environment configuration manages runtime settings

```mermaid
graph TB
subgraph "Server Layer"
S["server.js<br/>Entry Point"]
C["cors()<br/>CORS Middleware"]
EJ["express.json()<br/>JSON Parser"]
EU["express.urlencoded()<br/>URL Decoder"]
end
subgraph "Routing Layer"
R["routes/ecoScore.js<br/>REST Routes"]
V["Validation Middleware<br/>express-validator"]
end
subgraph "Business Logic"
CTRL["controllers/ecoScoreController.js<br/>Controller"]
CALC["utils/scoreCalculator.js<br/>Calculation Engine"]
end
subgraph "Persistence Layer"
DB["config/db.js<br/>MongoDB Connection"]
MODEL["models/EcoScoreResult.js<br/>Mongoose Model"]
end
subgraph "Error Handling"
EH["middleware/errorHandler.js<br/>Global Error Handler"]
end
S --> C
S --> EJ
S --> EU
S --> R
R --> V
R --> CTRL
CTRL --> CALC
CTRL --> MODEL
S --> DB
S --> EH
```

**Diagram sources**
- [server.js](file://server/server.js#L1-L34)
- [ecoScore.js](file://server/routes/ecoScore.js#L1-L9)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L1-L73)
- [scoreCalculator.js](file://server/utils/scoreCalculator.js#L1-L113)
- [EcoScoreResult.js](file://server/models/EcoScoreResult.js#L1-L20)
- [db.js](file://server/config/db.js#L1-L18)
- [errorHandler.js](file://server/middleware/errorHandler.js#L1-L14)

**Section sources**
- [server.js](file://server/server.js#L1-L34)
- [package.json](file://server/package.json#L1-L23)

## Core Components
The backend consists of several core components that work together to provide a robust API service:

### Server Initialization and Bootstrap
The server entry point performs essential bootstrap tasks:
- Loads environment configuration using dotenv
- Initializes Express application instance
- Establishes MongoDB connection
- Configures middleware stack
- Registers route handlers
- Starts HTTP server with configurable port

### Database Connection Management
The database module provides centralized connection management with:
- Async connection handling with try-catch error management
- Connection logging for monitoring
- Graceful shutdown handling via process exit on connection failure
- Configuration via environment variables

### Request Validation and Processing
The controller implements comprehensive input validation using express-validator:
- Validates numeric inputs with minimum thresholds
- Ensures boolean values for animal-based products
- Restricts categorical values to predefined enums
- Handles extraction and transformation of validated data
- Implements structured error responses for validation failures

### Calculation Engine
The score calculator implements a rule-based algorithm that:
- Applies penalties based on carbon footprint, water usage, and product characteristics
- Considers origin, packaging materials, and transportation modes
- Normalizes scores to a 0-100 scale
- Categorizes results into meaningful tiers
- Generates contextual messages based on score ranges

**Section sources**
- [server.js](file://server/server.js#L1-L34)
- [db.js](file://server/config/db.js#L1-L18)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L1-L73)
- [scoreCalculator.js](file://server/utils/scoreCalculator.js#L1-L113)

## Architecture Overview
The backend follows a layered architecture pattern with clear separation between presentation, business logic, and data persistence layers:

```mermaid
sequenceDiagram
participant Client as "Client Application"
participant Server as "Express Server"
participant CORS as "CORS Middleware"
participant JSON as "Body Parser"
participant Route as "Route Handler"
participant Validator as "Validation Middleware"
participant Controller as "Controller"
participant Calc as "Calculator"
participant Model as "Mongoose Model"
participant DB as "MongoDB"
participant ErrorHandler as "Error Handler"
Client->>Server : HTTP Request (POST /api/eco-score)
Server->>CORS : Apply CORS Policy
Server->>JSON : Parse JSON Body
Server->>Route : Route to ecoScore endpoint
Route->>Validator : Validate Input Fields
Validator-->>Route : Validation Results
Route->>Controller : Call calculateAndSaveEcoScore
Controller->>Calc : calculateEcoScore(inputs)
Calc-->>Controller : Calculated Results
Controller->>Model : Create EcoScoreResult
Model->>DB : Save Document
DB-->>Model : Confirmation
Model-->>Controller : Saved Document
Controller-->>Client : JSON Response
Note over Server,ErrorHandler : Global error handling for uncaught exceptions
```

**Diagram sources**
- [server.js](file://server/server.js#L13-L27)
- [ecoScore.js](file://server/routes/ecoScore.js#L5-L6)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L17-L67)
- [scoreCalculator.js](file://server/utils/scoreCalculator.js#L6-L110)
- [EcoScoreResult.js](file://server/models/EcoScoreResult.js#L3-L17)
- [errorHandler.js](file://server/middleware/errorHandler.js#L1-L11)

## Detailed Component Analysis

### Server Entry Point Analysis
The server initialization process demonstrates clean separation of concerns and robust error handling:

```mermaid
flowchart TD
Start([Server Startup]) --> LoadEnv["Load Environment Variables"]
LoadEnv --> InitApp["Initialize Express App"]
InitApp --> ConnectDB["Connect to MongoDB"]
ConnectDB --> DBSuccess{"Connection Success?"}
DBSuccess --> |No| ExitProcess["Exit Process with Error"]
DBSuccess --> |Yes| SetupMiddleware["Configure Middleware Stack"]
SetupMiddleware --> RegisterRoutes["Register Route Handlers"]
RegisterRoutes --> HealthCheck["Add Health Check Endpoint"]
HealthCheck --> SetupErrorHandling["Configure Error Handler"]
SetupErrorHandling --> StartServer["Start HTTP Server"]
StartServer --> Running([Server Running])
ExitProcess --> End([Shutdown])
Running --> End
```

**Diagram sources**
- [server.js](file://server/server.js#L1-L34)
- [db.js](file://server/config/db.js#L3-L15)

**Section sources**
- [server.js](file://server/server.js#L1-L34)

### Database Connection Module
The database connection module implements resilient connection management:

```mermaid
classDiagram
class DatabaseConnection {
+connectDB() Promise
-mongoose Mongoose
-MONGODB_URI string
+tryConnect() void
+handleError(error) void
+logConnection() void
}
class MongoConnection {
+host string
+name string
+port number
+connected() boolean
}
DatabaseConnection --> MongoConnection : "establishes"
```

**Diagram sources**
- [db.js](file://server/config/db.js#L3-L15)

**Section sources**
- [db.js](file://server/config/db.js#L1-L18)

### Controller Implementation Pattern
The controller implements the MVC pattern with clear separation of concerns:

```mermaid
classDiagram
class EcoScoreController {
+validateEcoScoreInput array
+calculateAndSaveEcoScore(req, res, next) Promise
-extractInputs(req) object
-validateInputs(req) ValidationResult
-saveToDatabase(result) EcoScoreResult
}
class ValidationRules {
+carbon PositiveNumber
+water PositiveNumber
+animalBased Boolean
+origin Enum(local, imported)
+category Enum(food, beverage, personal care, accessories)
+packaging Enum(plastic, paper, glass, cardboard, compostable, none)
+transport Enum(air, ship, truck)
}
class ScoreCalculator {
+calculateEcoScore(inputs) object
-applyCarbonPenalty() number
-applyWaterPenalty() number
-applyAnimalBasedPenalty() number
-applyOriginPenalty() number
-applyPackagingPenalty() number
-applyTransportPenalty() number
-normalizeScore() number
-categorizeScore() string
-generateMessage() string
}
EcoScoreController --> ValidationRules : "uses"
EcoScoreController --> ScoreCalculator : "uses"
```

**Diagram sources**
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L6-L14)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L17-L67)
- [scoreCalculator.js](file://server/utils/scoreCalculator.js#L6-L110)

**Section sources**
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L1-L73)

### Model Schema Design
The Mongoose model defines a comprehensive schema for storing eco-score calculations:

```mermaid
erDiagram
ECO_SCORE_RESULT {
object_id _id PK
json inputs
number calculatedScore
string category
string carbonImpact
string message
timestamp createdAt
timestamp updatedAt
}
INPUTS {
number carbon
number water
boolean animalBased
string origin
string category
string packaging
string transport
}
ECO_SCORE_RESULT ||--|| INPUTS : "contains"
```

**Diagram sources**
- [EcoScoreResult.js](file://server/models/EcoScoreResult.js#L3-L17)

**Section sources**
- [EcoScoreResult.js](file://server/models/EcoScoreResult.js#L1-L20)

### Route Definition and Validation
The route configuration demonstrates RESTful design principles:

```mermaid
flowchart LR
subgraph "Route Layer"
Router["Express Router"]
PostEndpoint["POST /api/eco-score"]
ValidationChain["Validation Chain"]
end
subgraph "Controller Layer"
Controller["calculateAndSaveEcoScore"]
BusinessLogic["Business Logic"]
end
subgraph "Response Layer"
SuccessResponse["200 OK JSON"]
ErrorResponse["400 Bad Request JSON"]
end
Router --> PostEndpoint
PostEndpoint --> ValidationChain
ValidationChain --> Controller
Controller --> BusinessLogic
BusinessLogic --> SuccessResponse
ValidationChain --> |Validation Error| ErrorResponse
```

**Diagram sources**
- [ecoScore.js](file://server/routes/ecoScore.js#L5-L6)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L17-L67)

**Section sources**
- [ecoScore.js](file://server/routes/ecoScore.js#L1-L9)

### Error Handling Strategy
The global error handler provides consistent error responses:

```mermaid
flowchart TD
Request[Incoming Request] --> Route[Route Handler]
Route --> Controller[Controller Method]
Controller --> TryBlock[Try Block]
TryBlock --> ValidationErrors{Validation Errors?}
ValidationErrors --> |Yes| Send400[Send 400 Response]
ValidationErrors --> |No| BusinessLogic[Business Logic]
BusinessLogic --> DatabaseError{Database Error?}
DatabaseError --> |Yes| Send500[Send 500 Response]
DatabaseError --> |No| Success[Success Response]
TryBlock --> Exception{Exception Thrown?}
Exception --> |Yes| ErrorHandler[Global Error Handler]
ErrorHandler --> SendError[Send Error Response]
Send400 --> End([Response Sent])
Send500 --> End
SendError --> End
Success --> End
```

**Diagram sources**
- [errorHandler.js](file://server/middleware/errorHandler.js#L1-L11)

**Section sources**
- [errorHandler.js](file://server/middleware/errorHandler.js#L1-L14)

## Dependency Analysis
The backend maintains clean dependency relationships with minimal coupling:

```mermaid
graph TB
subgraph "External Dependencies"
EXPRESS["express ^5.2.1"]
MONGOOSE["mongoose ^9.1.5"]
CORS["cors ^2.8.6"]
VALIDATOR["express-validator ^7.3.1"]
DOTENV["dotenv ^17.2.3"]
end
subgraph "Internal Dependencies"
SERVER["server.js"]
ROUTES["routes/ecoScore.js"]
CONTROLLER["controllers/ecoScoreController.js"]
MODEL["models/EcoScoreResult.js"]
UTILS["utils/scoreCalculator.js"]
ERROR["middleware/errorHandler.js"]
CONFIG["config/db.js"]
end
SERVER --> EXPRESS
SERVER --> CORS
SERVER --> ROUTES
SERVER --> ERROR
SERVER --> CONFIG
ROUTES --> CONTROLLER
CONTROLLER --> VALIDATOR
CONTROLLER --> MODEL
CONTROLLER --> UTILS
MODEL --> MONGOOSE
CONFIG --> MONGOOSE
ERROR --> SERVER
```

**Diagram sources**
- [package.json](file://server/package.json#L15-L21)
- [server.js](file://server/server.js#L1-L6)
- [ecoScore.js](file://server/routes/ecoScore.js#L1-L3)

**Section sources**
- [package.json](file://server/package.json#L1-L23)

## Performance Considerations
Several performance optimization strategies are implemented:

### Middleware Efficiency
- Early request parsing prevents unnecessary processing
- Minimal middleware stack reduces overhead
- Efficient JSON parsing for large payloads

### Database Optimization
- Single connection established at startup
- Timestamp fields enable efficient querying
- Schema validation prevents invalid data storage

### Calculation Performance
- Pure function calculations avoid side effects
- Early termination for penalty calculations
- Efficient scoring normalization

### Scalability Enhancements
- Environment-based configuration for different deployments
- Modular architecture enables horizontal scaling
- Stateless controller design supports load balancing

## Troubleshooting Guide
Common issues and their resolution strategies:

### Database Connection Issues
- Verify MongoDB URI in environment variables
- Check network connectivity to database server
- Monitor connection logs for authentication errors

### Validation Failures
- Review input field constraints in validation rules
- Check data types match expected formats
- Validate enum values against allowed options

### API Response Issues
- Examine error handler configuration
- Verify controller response formatting
- Check CORS configuration for cross-origin requests

**Section sources**
- [db.js](file://server/config/db.js#L11-L14)
- [errorHandler.js](file://server/middleware/errorHandler.js#L1-L11)

## Security Considerations
The backend implements several security measures:

### Input Validation
- Comprehensive field validation using express-validator
- Type checking for all input parameters
- Range validation for numeric fields
- Enum restriction for categorical data

### Cross-Origin Resource Sharing
- CORS middleware enabled for flexible client-server communication
- Configurable origins for development and production environments
- Support for preflight requests

### Error Handling Security
- Generic error messages in production environment
- Stack traces only shown in development mode
- Prevents information leakage about internal system structure

### Environment Configuration
- Sensitive configuration loaded from environment variables
- Separate configuration for development and production
- Database credentials stored securely

**Section sources**
- [server.js](file://server/server.js#L14-L16)
- [ecoScoreController.js](file://server/controllers/ecoScoreController.js#L6-L14)
- [errorHandler.js](file://server/middleware/errorHandler.js#L9-L10)

## Scalability and Deployment
The architecture supports scalable deployment patterns:

### Horizontal Scaling
- Stateless controller design allows multiple instances
- Centralized database connection supports multiple workers
- Load balancer can distribute traffic across instances

### Environment Configuration
- Environment-specific settings for different deployment stages
- Database connection pooling configuration
- Logging level adjustments for production monitoring

### Monitoring and Observability
- Connection logging for database health monitoring
- Request/response logging for API monitoring
- Error tracking for application reliability

### Containerization Readiness
- Standard Node.js application structure
- Environment variable configuration
- Port configuration for container orchestration

**Section sources**
- [server.js](file://server/server.js#L29-L33)
- [.env.example](file://server/.env.example#L1-L4)

## Conclusion
The Eco Score Predictor backend demonstrates a well-architected Express.js application that effectively implements modern backend development practices. The modular structure, comprehensive validation, robust error handling, and clean separation of concerns provide a solid foundation for growth and maintenance. The implementation balances simplicity with functionality, making it suitable for both development and production environments while maintaining clear pathways for future enhancements.

Key strengths include the clear MVC separation, comprehensive input validation, centralized error handling, and thoughtful database design. The architecture supports scalability through modular components and environment-driven configuration, while security considerations are addressed through input validation and secure error handling practices.