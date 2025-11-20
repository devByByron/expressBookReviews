# Book Review Application - Postman Test Cases

This document provides all test cases for the Express Book Review Application. Use these requests in Postman or curl to test all endpoints.

## Prerequisites

-   Server running on `http://localhost:5000`
-   npm install completed
-   Server started with `npm start`

---

## GENERAL USER ENDPOINTS (Tasks 1-5)

### Task 1: Get All Books

**Endpoint:** `GET http://localhost:5000/`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/
-   Headers: None required
-   Body: None

**Expected Response:** 200 OK

```json
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  ...
}
```

**curl Command:**

```bash
curl -X GET http://localhost:5000/ -H "Content-Type: application/json"
```

**Screenshot Name:** `1-getallbooks.png`

---

### Task 2: Get Books by ISBN

**Endpoint:** `GET http://localhost:5000/isbn/:isbn`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/isbn/1
-   Headers: None required
-   Body: None

**Expected Response:** 200 OK

```json
{
	"author": "Chinua Achebe",
	"title": "Things Fall Apart",
	"reviews": {}
}
```

**curl Command:**

```bash
curl -X GET http://localhost:5000/isbn/1 -H "Content-Type: application/json"
```

**Test Different ISBNs:**

-   ISBN 2: Hans Christian Andersen - Fairy tales
-   ISBN 3: Dante Alighieri - The Divine Comedy
-   ISBN 10: James Austen - Sense and Sensibility

**Screenshot Name:** `2-getbooksbyISBN.png`

---

### Task 3: Get Books by Author

**Endpoint:** `GET http://localhost:5000/author/:author`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/author/Jane%20Austen
-   Headers: None required
-   Body: None

**Expected Response:** 200 OK

```json
[
	{
		"author": "Jane Austen",
		"title": "Pride and Prejudice",
		"reviews": {}
	},
	{
		"author": "Jane Austen",
		"title": "Sense and Sensibility",
		"reviews": {}
	}
]
```

**curl Commands:**

```bash
# Search for Jane Austen
curl -X GET "http://localhost:5000/author/Jane%20Austen" -H "Content-Type: application/json"

# Search for other authors
curl -X GET "http://localhost:5000/author/Chinua%20Achebe" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/author/Shakespeare" -H "Content-Type: application/json"
```

**Screenshot Name:** `3-getbooksbyauthor.png`

---

### Task 4: Get Books by Title

**Endpoint:** `GET http://localhost:5000/title/:title`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/title/Pride%20and%20Prejudice
-   Headers: None required
-   Body: None

**Expected Response:** 200 OK

```json
[
	{
		"author": "Jane Austen",
		"title": "Pride and Prejudice",
		"reviews": {}
	}
]
```

**curl Commands:**

```bash
# Search for Pride and Prejudice
curl -X GET "http://localhost:5000/title/Pride%20and%20Prejudice" -H "Content-Type: application/json"

# Search for other titles
curl -X GET "http://localhost:5000/title/Things%20Fall%20Apart" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/title/The%20Great%20Gatsby" -H "Content-Type: application/json"
```

**Screenshot Name:** `4-getbooksbytitle.png`

---

### Task 5: Get Book Reviews

**Endpoint:** `GET http://localhost:5000/review/:isbn`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/review/1
-   Headers: None required
-   Body: None

**Expected Response:** 200 OK

```json
{}
```

**curl Commands:**

```bash
# Get reviews for ISBN 1
curl -X GET http://localhost:5000/review/1 -H "Content-Type: application/json"

# Get reviews for ISBN 5
curl -X GET http://localhost:5000/review/5 -H "Content-Type: application/json"
```

**Screenshot Name:** `5-getbookreview.png`

---

## USER AUTHENTICATION ENDPOINTS

### Task 6: Register New User

**Endpoint:** `POST http://localhost:5000/register`

**Postman Setup:**

-   Method: POST
-   URL: http://localhost:5000/register
-   Headers: Content-Type: application/json
-   Body (raw JSON):

```json
{
	"username": "testuser1",
	"password": "password123"
}
```

**Expected Response:** 200 OK

```json
{
	"message": "User successfully registered. Now you can login"
}
```

**curl Command:**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}'
```

**Test Cases:**

1. **New User Registration:**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"secure_pass123"}'
```

2. **Duplicate User (should fail):**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"another_pass"}'
```

3. **Missing Username (should fail):**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"password":"password123"}'
```

4. **Missing Password (should fail):**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'
```

**Screenshot Name:** `6-register.png`

---

### Task 7: User Login

**Endpoint:** `POST http://localhost:5000/customer/login`

**Postman Setup:**

-   Method: POST
-   URL: http://localhost:5000/customer/login
-   Headers: Content-Type: application/json
-   Body (raw JSON):

```json
{
	"username": "testuser1",
	"password": "password123"
}
```

**Expected Response:** 200 OK

```json
{
	"message": "Customer successfully logged in"
}
```

**curl Command:**

```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}'
```

**Important:** The login endpoint sets a session cookie. To use authenticated endpoints, you need to save and send this cookie with subsequent requests.

**Postman Setup for Session:**

1. Set up a new collection variable for the token
2. Or manually copy the session cookie from the Response Headers
3. Add to subsequent requests as a cookie

**Screenshot Name:** `7-login.png`

---

## AUTHENTICATED USER ENDPOINTS (Tasks 8-9)

### Task 8: Add/Modify Book Review

**Endpoint:** `PUT http://localhost:5000/customer/auth/review/:isbn`

**Prerequisite:** Must be logged in (see Task 7)

**Postman Setup:**

-   Method: PUT
-   URL: http://localhost:5000/customer/auth/review/1
-   Headers:
    -   Content-Type: application/json
    -   (Include session cookie from login)
-   Query Parameters:
    -   review: "This is an excellent book! Highly recommended."

**Expected Response:** 200 OK

```json
{
	"message": "Review successfully added/modified"
}
```

**curl Command (with session):**

```bash
# First, login to get session
curl -c cookies.txt -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}'

# Then add review using the saved session
curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20an%20excellent%20book" \
  -H "Content-Type: application/json"
```

**Test Cases:**

1. **Add New Review:**

```bash
curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/2?review=Great%20fairy%20tales%20for%20kids" \
  -H "Content-Type: application/json"
```

2. **Modify Existing Review:**

```bash
curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=Updated%20review%20-%20Amazing%20book" \
  -H "Content-Type: application/json"
```

3. **Different User Adding Review to Same ISBN:**
    - Register new user
    - Login with new user
    - Add review to same ISBN
    - Should create separate review entry

**Screenshot Name:** `8-reviewadded.png`

---

### Task 9: Delete Book Review

**Endpoint:** `DELETE http://localhost:5000/customer/auth/review/:isbn`

**Prerequisite:** Must be logged in with same user who added the review

**Postman Setup:**

-   Method: DELETE
-   URL: http://localhost:5000/customer/auth/review/1
-   Headers:
    -   Content-Type: application/json
    -   (Include session cookie from login)
-   Body: None

**Expected Response:** 200 OK

```json
{
	"message": "Review successfully deleted"
}
```

**curl Command (with session):**

```bash
# Using saved session from login
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1 \
  -H "Content-Type: application/json"
```

**Test Cases:**

1. **Delete Review Added by Current User:**

```bash
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/2 \
  -H "Content-Type: application/json"
```

2. **Delete Review (verify it's deleted):**

```bash
# Add a review first
curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/3?review=Test%20review" \
  -H "Content-Type: application/json"

# Delete it
curl -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/3 \
  -H "Content-Type: application/json"

# Verify deletion by checking reviews
curl -b cookies.txt -X GET http://localhost:5000/review/3 \
  -H "Content-Type: application/json"
```

**Screenshot Name:** `9-deletereview.png`

---

## ASYNC/AWAIT AND PROMISES ENDPOINTS (Tasks 10-13)

### Task 10: Get All Books using Async/Await

**Endpoint:** `GET http://localhost:5000/async/all`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/async/all
-   Headers: Content-Type: application/json
-   Body: None

**Expected Response:** 200 OK

```json
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  ...
}
```

**curl Command:**

```bash
curl -X GET http://localhost:5000/async/all -H "Content-Type: application/json"
```

**Screenshot Name:** `task10.png`

**Code Reference to Screenshot:** Show the async/await implementation in `general.js`:

```javascript
// Task 10: Get all books – Using async callback function with async/await
public_users.get("/async/all", async (req, res) => {
	try {
		const allBooks = await new Promise((resolve) => {
			resolve(books);
		});
		return res.status(200).json(allBooks);
	} catch (error) {
		return res.status(500).json({ message: "Error retrieving books" });
	}
});
```

---

### Task 11: Search by ISBN using Promises

**Endpoint:** `GET http://localhost:5000/promise/isbn/:isbn`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/promise/isbn/1
-   Headers: Content-Type: application/json
-   Body: None

**Expected Response:** 200 OK

```json
{
	"author": "Chinua Achebe",
	"title": "Things Fall Apart",
	"reviews": {}
}
```

**curl Commands:**

```bash
# Search for ISBN 1
curl -X GET http://localhost:5000/promise/isbn/1 -H "Content-Type: application/json"

# Search for ISBN 5
curl -X GET http://localhost:5000/promise/isbn/5 -H "Content-Type: application/json"

# Search for ISBN 8
curl -X GET http://localhost:5000/promise/isbn/8 -H "Content-Type: application/json"
```

**Screenshot Name:** `task11.png`

**Code Reference to Screenshot:** Show the Promise implementation in `general.js`:

```javascript
// Task 11: Search by ISBN – Using Promises
public_users.get("/promise/isbn/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	return new Promise((resolve, reject) => {
		try {
			if (books[isbn]) {
				res.status(200).json(books[isbn]);
				resolve(books[isbn]);
			} else {
				res.status(404).json({ message: "ISBN not found" });
				reject(new Error("ISBN not found"));
			}
		} catch (error) {
			res.status(500).json({ message: "Error searching by ISBN" });
			reject(error);
		}
	});
});
```

---

### Task 12: Search by Author using Promises

**Endpoint:** `GET http://localhost:5000/promise/author/:author`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/promise/author/Jane%20Austen
-   Headers: Content-Type: application/json
-   Body: None

**Expected Response:** 200 OK

```json
[
	{
		"author": "Jane Austen",
		"title": "Pride and Prejudice",
		"reviews": {}
	},
	{
		"author": "Jane Austen",
		"title": "Sense and Sensibility",
		"reviews": {}
	}
]
```

**curl Commands:**

```bash
# Search for Jane Austen
curl -X GET "http://localhost:5000/promise/author/Jane%20Austen" -H "Content-Type: application/json"

# Search for Chinua Achebe
curl -X GET "http://localhost:5000/promise/author/Chinua%20Achebe" -H "Content-Type: application/json"

# Search for Shakespeare
curl -X GET "http://localhost:5000/promise/author/Shakespeare" -H "Content-Type: application/json"
```

**Screenshot Name:** `task12.png`

**Code Reference to Screenshot:** Show the Promise implementation in `general.js`:

```javascript
// Task 12: Search by Author – Using Promises
public_users.get("/promise/author/:author", (req, res) => {
	const author = req.params.author;
	return new Promise((resolve, reject) => {
		try {
			let result = [];
			for (let key in books) {
				if (books[key].author.toLowerCase() === author.toLowerCase()) {
					result.push(books[key]);
				}
			}
			if (result.length > 0) {
				res.status(200).json(result);
				resolve(result);
			} else {
				res.status(404).json({ message: "Author not found" });
				reject(new Error("Author not found"));
			}
		} catch (error) {
			res.status(500).json({ message: "Error searching by author" });
			reject(error);
		}
	});
});
```

---

### Task 13: Search by Title using Promises

**Endpoint:** `GET http://localhost:5000/promise/title/:title`

**Postman Setup:**

-   Method: GET
-   URL: http://localhost:5000/promise/title/Things%20Fall%20Apart
-   Headers: Content-Type: application/json
-   Body: None

**Expected Response:** 200 OK

```json
[
	{
		"author": "Chinua Achebe",
		"title": "Things Fall Apart",
		"reviews": {}
	}
]
```

**curl Commands:**

```bash
# Search for Things Fall Apart
curl -X GET "http://localhost:5000/promise/title/Things%20Fall%20Apart" -H "Content-Type: application/json"

# Search for Pride and Prejudice
curl -X GET "http://localhost:5000/promise/title/Pride%20and%20Prejudice" -H "Content-Type: application/json"

# Search for The Great Gatsby
curl -X GET "http://localhost:5000/promise/title/The%20Great%20Gatsby" -H "Content-Type: application/json"
```

**Screenshot Name:** `task13.png`

**Code Reference to Screenshot:** Show the Promise implementation in `general.js`:

```javascript
// Task 13: Search by Title – Using Promises
public_users.get("/promise/title/:title", (req, res) => {
	const title = req.params.title;
	return new Promise((resolve, reject) => {
		try {
			let result = [];
			for (let key in books) {
				if (books[key].title.toLowerCase() === title.toLowerCase()) {
					result.push(books[key]);
				}
			}
			if (result.length > 0) {
				res.status(200).json(result);
				resolve(result);
			} else {
				res.status(404).json({ message: "Title not found" });
				reject(new Error("Title not found"));
			}
		} catch (error) {
			res.status(500).json({ message: "Error searching by title" });
			reject(error);
		}
	});
});
```

---

## Testing Workflow Summary

### Step 1: Start the Server

```bash
cd final_project
npm start
```

### Step 2: General User Tests (Tasks 1-5)

1. Test `GET /` → Screenshot `1-getallbooks.png`
2. Test `GET /isbn/:isbn` → Screenshot `2-getbooksbyISBN.png`
3. Test `GET /author/:author` → Screenshot `3-getbooksbyauthor.png`
4. Test `GET /title/:title` → Screenshot `4-getbooksbytitle.png`
5. Test `GET /review/:isbn` → Screenshot `5-getbookreview.png`

### Step 3: User Registration and Login (Tasks 6-7)

6. Test `POST /register` → Screenshot `6-register.png`
7. Test `POST /customer/login` → Screenshot `7-login.png`

### Step 4: Authenticated User Operations (Tasks 8-9)

8. Test `PUT /customer/auth/review/:isbn` → Screenshot `8-reviewadded.png`
9. Test `DELETE /customer/auth/review/:isbn` → Screenshot `9-deletereview.png`

### Step 5: Async/Promises Operations (Tasks 10-13)

10. Test `GET /async/all` + show code → Screenshot `task10.png`
11. Test `GET /promise/isbn/:isbn` + show code → Screenshot `task11.png`
12. Test `GET /promise/author/:author` + show code → Screenshot `task12.png`
13. Test `GET /promise/title/:title` + show code → Screenshot `task13.png`

---

## Available Books for Testing

| ISBN | Author                  | Title                       | Reviews |
| ---- | ----------------------- | --------------------------- | ------- |
| 1    | Chinua Achebe           | Things Fall Apart           | {}      |
| 2    | Hans Christian Andersen | Fairy tales                 | {}      |
| 3    | Dante Alighieri         | The Divine Comedy           | {}      |
| 4    | Unknown                 | The Epic of Gilgamesh       | {}      |
| 5    | Unknown                 | The Book of Job             | {}      |
| 6    | Unknown                 | One Thousand and One Nights | {}      |
| 7    | Unknown                 | Njos. Saga                  | {}      |
| 8    | Jane Austen             | Pride and Prejudice         | {}      |
| 9    | Jane Austen             | Sense and Sensibility       | {}      |
| 10   | James Austen            | The Great Gatsby            | {}      |

---

## Important Notes for Screenshots

1. **Include Response Body:** Make sure the JSON response is visible in your screenshot
2. **Include URL:** The endpoint URL should be visible
3. **Include Status Code:** Show the HTTP status code (e.g., 200 OK, 404 Not Found)
4. **For Tasks 10-13:** Also include the code implementation in your screenshot to demonstrate you used Promises/Async-Await

## Alternative: Using curl with JSON Pretty Print

If using curl, you can pipe output to jq for pretty printing:

```bash
curl http://localhost:5000/ | jq '.'
```

This will make the JSON output more readable for screenshots.
