# 🌱 Eco Score Predictor

A full-stack MERN web application that calculates product sustainability scores based on environmental impact factors. This is a resume-ready project showcasing clean architecture, responsive design, and rule-based logic.

## 🎯 Project Overview

Eco Score Predictor allows users to input product sustainability details (carbon footprint, water usage, packaging, etc.) and receive an eco score (0-100) based on weighted rule-based logic. No AI/ML involved - just pure, transparent calculations.

## 🧱 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** - Mobile-first responsive design
- **Axios** - HTTP client

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose** - Database
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## ✨ Features

- ✅ Rule-based eco scoring (no AI/ML)
- ✅ Clean, responsive UI with dark sustainability theme
- ✅ Real-time score calculation
- ✅ MongoDB data persistence
- ✅ Input validation and error handling
- ✅ RESTful API architecture
- ✅ Mobile-first responsive design

## 📊 Scoring Logic

The application starts with a perfect score of 100 and applies penalties based on:

- **Carbon Footprint**: -20 for >5kg, -10 for 2-5kg
- **Water Usage**: -15 for >50L
- **Animal-Based**: -10 penalty
- **Imported Products**: -10 penalty
- **Packaging**: Plastic (-15), Glass (-5), Paper/Cardboard (-3), Compostable (0), None (+2)
- **Transportation**: Air (-20), Ship (-10), Truck (-5)

### Score Categories
- **80-100**: Excellent
- **60-79**: Good
- **40-59**: Fair
- **0-39**: Needs Improvement

## 📁 Project Structure

```
eco-score-predictor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Error handling
│   ├── utils/             # Score calculator
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd eco-score-predictor
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eco-score-predictor
NODE_ENV=development
```

Start MongoDB (if running locally):
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Documentation

### POST `/api/eco-score`

Calculate eco score for a product.

**Request Body:**
```json
{
  "carbon": 2.5,
  "water": 30,
  "animalBased": false,
  "origin": "local",
  "category": "food",
  "packaging": "plastic",
  "transport": "truck"
}
```

**Response:**
```json
{
  "success": true,
  "ecoScore": 70,
  "category": "Good",
  "carbonImpact": "Low",
  "message": "Your product has a good environmental impact."
}
```

**Field Validations:**
- `carbon`: Positive number
- `water`: Positive number
- `animalBased`: Boolean
- `origin`: "local" | "imported"
- `category`: "food" | "beverage" | "personal care" | "accessories"
- `packaging`: "plastic" | "paper" | "glass" | "cardboard" | "compostable" | "none"
- `transport`: "air" | "ship" | "truck"

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Theme**: Clean green/dark sustainability theme
- **Interactive Form**: Real-time validation and feedback
- **Score Visualization**: Circular progress indicator with color coding
- **Smooth Animations**: Fade-in effects and transitions

## 🧪 Testing the Application

### Example Test Case 1: Excellent Score
- Carbon: 1.0 kg
- Water: 20 L
- Animal-Based: No
- Origin: Local
- Category: Food
- Packaging: None
- Transport: Truck
- **Expected Score**: ~87 (Excellent)

### Example Test Case 2: Poor Score
- Carbon: 10 kg
- Water: 100 L
- Animal-Based: Yes
- Origin: Imported
- Category: Food
- Packaging: Plastic
- Transport: Air
- **Expected Score**: ~25 (Needs Improvement)

## 🛠️ Development Scripts

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔮 Future Enhancements

- User authentication and profile management
- Historical score tracking and comparison
- Export results as PDF
- Admin dashboard for analytics
- Multi-language support
- Product recommendations based on score

## 📝 Notes

- This is a resume project demonstrating full-stack development skills
- No AI/ML models are used - all calculations are transparent and rule-based
- Data is persisted to MongoDB for every calculation
- CORS is configured to allow frontend-backend communication

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ as a MERN stack portfolio project

---

**Happy Coding! 🌍♻️**
