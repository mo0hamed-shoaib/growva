# Growva Backend API

Backend API for Growva - ATS-optimized CV builder with anonymous user support.

## 🚀 Features

- **Anonymous User System**: No signup required, uses UUID-based user identification
- **Full CRUD Operations**: Create, read, update, and delete CVs
- **ATS-Optimized Templates**: Pre-configured templates for Applicant Tracking Systems
- **Security**: Rate limiting, CORS, helmet, and input validation
- **MongoDB Integration**: Flexible document storage with Mongoose schemas

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/growva
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/growva

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### CV Management

#### Create CV
```http
POST /api/cvs
Content-Type: application/json

{
  "userId": "uuid-string",
  "cvData": {
    "personalInfo": {
      "fullName": "John Doe",
      "email": { "value": "john@example.com" }
    }
  },
  "template": "classic"
}
```

#### Get CV by ID
```http
GET /api/cvs/:cvId
```

#### Update CV
```http
PUT /api/cvs/:cvId
Content-Type: application/json

{
  "cvData": {
    "summary": "Updated summary"
  }
}
```

#### Delete CV
```http
DELETE /api/cvs/:cvId
```

#### Get User's CVs
```http
GET /api/users/:userId/cvs?page=1&limit=10
```

### Templates

#### Get All Templates
```http
GET /api/templates
```

#### Get Template by ID
```http
GET /api/templates/:templateId
```

#### Get Template Preview
```http
GET /api/templates/:templateId/preview
```

### Health Check
```http
GET /health
```

## 🗄️ Data Models

### CV Schema

The CV model includes:

- **Personal Information**: Name, contact details, social links
- **Work Experience**: Job history with achievements
- **Education**: Academic background
- **Skills**: Grouped skills with proficiency levels
- **Certifications**: Professional certifications
- **Projects**: Portfolio projects with tech stack
- **Languages**: Language proficiency
- **Customization**: Theme, colors, layout preferences

### Template Schema

Templates include:
- Template ID and name
- Description and features
- ATS optimization status
- Thumbnail URL

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Consistent error responses

## 🧪 Development

### Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

### Project Structure

```
backend/
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── controllers/     # Route handlers (future)
├── middlewares/     # Custom middleware (future)
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
└── .env            # Environment variables
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure `MONGODB_URI` for production database
- Set appropriate `FRONTEND_URL`
- Configure rate limiting for production

## 📝 Notes

- **Anonymous Users**: Uses UUID stored in client localStorage
- **ATS Compatibility**: All templates are optimized for Applicant Tracking Systems
- **No Authentication**: Designed for anonymous usage without signup
- **Flexible Schema**: MongoDB allows for easy schema evolution

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Test API endpoints
5. Update documentation

## 📄 License

This project is part of the Growva CV builder application.
