# Express Book Review Application - Complete Lab Implementation

## 📚 Project Overview

This is a complete implementation of the Express Book Review Lab, demonstrating a full-featured REST API for a book review application with user authentication, CRUD operations, and modern JavaScript patterns (async/await and Promises).

## ✨ Features Implemented

### General User Features (Tasks 1-5)

-   ✅ View all available books
-   ✅ Search books by ISBN
-   ✅ Search books by author
-   ✅ Search books by title
-   ✅ View book reviews

### User Management (Tasks 6-7)

-   ✅ User registration with validation
-   ✅ User login with JWT authentication
-   ✅ Session management
-   ✅ Password validation

### Authenticated User Features (Tasks 8-9)

-   ✅ Add new book reviews
-   ✅ Modify existing reviews
-   ✅ Delete own reviews
-   ✅ Prevent users from deleting others' reviews

### Modern JavaScript Patterns (Tasks 10-13)

-   ✅ Async/await implementation for retrieving all books
-   ✅ Promises implementation for ISBN search
-   ✅ Promises implementation for author search
-   ✅ Promises implementation for title search

## 🚀 Quick Start

### Prerequisites

-   Node.js (v12+)
-   npm (v6+)
-   Postman (for testing)

### Installation

```bash
# Clone repository
git clone https://github.com/devByByron/expressBookReviews.git
cd expressBookReviews/final_project

# Install dependencies
npm install
```

### Start Server

```bash
npm start
```

Server runs on `http://localhost:5000`

## 📖 API Endpoints

### General Public Routes (No Authentication)

| Task | Endpoint          | Method | Description            |
| ---- | ----------------- | ------ | ---------------------- |
| 1    | `/`               | GET    | Get all books          |
| 2    | `/isbn/:isbn`     | GET    | Get book by ISBN       |
| 3    | `/author/:author` | GET    | Get books by author    |
| 4    | `/title/:title`   | GET    | Get books by title     |
| 5    | `/review/:isbn`   | GET    | Get reviews for a book |
| 6    | `/register`       | POST   | Register new user      |

### Authentication

| Task | Endpoint          | Method | Description |
| ---- | ----------------- | ------ | ----------- |
| 7    | `/customer/login` | POST   | Login user  |

### Authenticated Routes (Requires Login)

| Task | Endpoint                      | Method | Description       |
| ---- | ----------------------------- | ------ | ----------------- |
| 8    | `/customer/auth/review/:isbn` | PUT    | Add/modify review |
| 9    | `/customer/auth/review/:isbn` | DELETE | Delete review     |

### Async/Promises Routes

| Task | Endpoint                  | Method | Implementation |
| ---- | ------------------------- | ------ | -------------- |
| 10   | `/async/all`              | GET    | Async/Await    |
| 11   | `/promise/isbn/:isbn`     | GET    | Promises       |
| 12   | `/promise/author/:author` | GET    | Promises       |
| 13   | `/promise/title/:title`   | GET    | Promises       |

## 🧪 Testing

### Using Postman

1. Import requests from `POSTMAN_TEST_CASES.md`
2. Or manually create requests using endpoints listed above
3. For authenticated endpoints, login first (Task 7)

### Using curl

```bash
# Get all books
curl -X GET http://localhost:5000/

# Register user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}' \
  -c cookies.txt

# Add review (with saved session)
curl -b cookies.txt -X PUT \
  "http://localhost:5000/customer/auth/review/1?review=Great%20book"
```

## 📁 Project Structure

```
expressBookReviews/
├── LICENSE
├── README.md
└── final_project/
    ├── index.js                        # Express server entry point
    ├── package.json                    # Dependencies
    ├── crud_operations.js              # Async/Promise implementations
    ├── POSTMAN_TEST_CASES.md          # Detailed test documentation
    ├── CURL_QUICK_REFERENCE.md        # Quick curl commands
    ├── POSTMAN_SCREENSHOT_GUIDE.md    # Step-by-step screenshot guide
    ├── IMPLEMENTATION_SUMMARY.md      # Implementation details
    ├── ALL_TEST_CASES.md              # Complete test cases
    ├── SUBMISSION_CHECKLIST.md        # Pre-submission checklist
    └── router/
        ├── general.js                  # General user routes + async/promises
        ├── auth_users.js               # Authentication & authenticated routes
        └── booksdb.js                  # Book database
```

## 📚 Documentation

Complete documentation is provided in the project:

1. **POSTMAN_TEST_CASES.md** - Detailed endpoint documentation with examples
2. **CURL_QUICK_REFERENCE.md** - Quick reference for curl commands
3. **POSTMAN_SCREENSHOT_GUIDE.md** - Step-by-step guide for creating screenshots
4. **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
5. **ALL_TEST_CASES.md** - All test cases with Postman setup
6. **SUBMISSION_CHECKLIST.md** - Pre-submission verification checklist

## 🔐 Authentication

The application uses:

-   **JWT (JSON Web Tokens)** for stateless authentication
-   **Express Sessions** for maintaining user sessions
-   **Password validation** to prevent unauthorized access

### Example Authentication Flow

1. **Register:** POST to `/register` with username and password
2. **Login:** POST to `/customer/login` to receive session token
3. **Use Token:** Include session cookie in authenticated requests
4. **Access Protected:** PUT/DELETE requests to `/customer/auth/*` endpoints

## 💾 Database

The book database (`booksdb.js`) includes 10 books with the following structure:

```javascript
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  // ... more books
}
```

Reviews are stored as:

```javascript
"reviews": {
  "username1": "Great book!",
  "username2": "Excellent read!"
}
```

## 🎯 Key Implementation Details

### Task 1-5: Synchronous Routes

-   Direct object access for ISBN lookups
-   Iteration and filtering for author/title searches

### Task 6: User Registration

-   Validates username and password
-   Prevents duplicate usernames
-   Stores credentials in-memory

### Task 7: User Login

-   Validates credentials
-   Generates JWT token
-   Establishes session

### Task 8: Add/Modify Review

-   Accepts review as query parameter
-   Links review to authenticated user
-   Overwrites existing review by same user for same ISBN

### Task 9: Delete Review

-   Only allows user to delete their own reviews
-   Filters by username and ISBN

### Task 10-13: Async/Promises Implementation

-   **Async/Await:** Task 10 - Wraps data retrieval in Promise
-   **Promises:** Tasks 11-13 - Uses .then()/.catch() for error handling

## 🛠 Technologies Used

-   **Node.js** - Runtime environment
-   **Express.js** - Web framework
-   **JWT** - Authentication tokens
-   **Express-Session** - Session management
-   **Axios** - HTTP client
-   **Nodemon** - Development auto-reload

## 📊 Status

**✅ COMPLETE** - All 13 tasks implemented and tested

-   [x] General user endpoints (Tasks 1-5)
-   [x] User registration (Task 6)
-   [x] User login (Task 7)
-   [x] Authenticated operations (Tasks 8-9)
-   [x] Async/Await implementation (Task 10)
-   [x] Promise implementations (Tasks 11-13)
-   [x] Error handling
-   [x] Session management
-   [x] Complete documentation

## 📸 Screenshots for Submission

All screenshots are taken with the following naming convention:

```
1-getallbooks.png
2-getbooksbyISBN.png
3-getbooksbyauthor.png
4-getbooksbytitle.png
5-getbookreview.png
6-register.png
7-login.png
8-reviewadded.png
9-deletereview.png
task10.png (with code)
task11.png (with code)
task12.png (with code)
task13.png (with code)
```

See `POSTMAN_SCREENSHOT_GUIDE.md` for detailed screenshot instructions.

## 🧪 Testing Checklist

-   [x] All endpoints return correct status codes
-   [x] Authentication working properly
-   [x] Reviews can be added and deleted
-   [x] Session management functional
-   [x] Async/await pattern implemented
-   [x] Promises pattern implemented
-   [x] Error handling in place
-   [x] All 13 tasks completed

## 🔍 Troubleshooting

### Port Already in Use

```bash
Stop-Process -Name node -Force
```

### Missing Dependencies

```bash
npm install
```

### Server Won't Start

-   Check for syntax errors in code
-   Verify all files in `router/` exist
-   Ensure `booksdb.js` is properly formatted

## 📝 Notes

-   Server runs on port 5000 (configurable in `index.js`)
-   All data is stored in-memory (not persistent)
-   Reviews are stored with username as key
-   Sessions expire when server restarts
-   Default timeout for sessions: 1 day

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

devByByron

## 🎓 Lab Reference

This project is the final project for the IBM Hands-on Lab course covering:

-   CRUD operations with Node.js
-   Express server implementation
-   JWT and session authentication
-   Async/await patterns
-   Promise patterns
-   RESTful API design

## 📚 Additional Resources

-   [Express.js Documentation](https://expressjs.com)
-   [JWT.io](https://jwt.io)
-   [MDN - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
-   [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
-   [Axios Documentation](https://axios-http.com)

---

**Last Updated:** November 20, 2025  
**Status:** ✅ Complete and Ready for Submission
