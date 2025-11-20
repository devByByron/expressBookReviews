# Express Book Review Lab - Complete Test Cases for Postman

## 📋 All Tasks Overview

| Task # | Name                    | Method | Endpoint                      | File          | Status |
| ------ | ----------------------- | ------ | ----------------------------- | ------------- | ------ |
| 1      | Get All Books           | GET    | `/`                           | general.js    | ✅     |
| 2      | Get Books by ISBN       | GET    | `/isbn/:isbn`                 | general.js    | ✅     |
| 3      | Get Books by Author     | GET    | `/author/:author`             | general.js    | ✅     |
| 4      | Get Books by Title      | GET    | `/title/:title`               | general.js    | ✅     |
| 5      | Get Book Reviews        | GET    | `/review/:isbn`               | general.js    | ✅     |
| 6      | Register New User       | POST   | `/register`                   | general.js    | ✅     |
| 7      | User Login              | POST   | `/customer/login`             | auth_users.js | ✅     |
| 8      | Add/Modify Review       | PUT    | `/customer/auth/review/:isbn` | auth_users.js | ✅     |
| 9      | Delete Review           | DELETE | `/customer/auth/review/:isbn` | auth_users.js | ✅     |
| 10     | Get All (Async)         | GET    | `/async/all`                  | general.js    | ✅     |
| 11     | Search ISBN (Promise)   | GET    | `/promise/isbn/:isbn`         | general.js    | ✅     |
| 12     | Search Author (Promise) | GET    | `/promise/author/:author`     | general.js    | ✅     |
| 13     | Search Title (Promise)  | GET    | `/promise/title/:title`       | general.js    | ✅     |

---

## 🎬 How to Create Each Screenshot

### Prerequisites

```bash
# Terminal 1: Start the server
cd 'C:\Users\young\Downloads\Projects\expressBookReviews\final_project'
npm start
# Server runs on http://localhost:5000
```

```bash
# Terminal 2: Open Postman (or use curl)
# Use fresh terminal for testing
```

---

## Screenshot 1: Get All Books

**File:** `1-getallbooks.png`

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL bar showing `/`
-   GET method selected
-   Status code: `200 OK`
-   Response body showing all 10 books

**curl Command:**

```bash
curl -X GET http://localhost:5000/ -H "Content-Type: application/json"
```

---

## Screenshot 2: Get Books by ISBN

**File:** `2-getbooksbyISBN.png`

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/isbn/1
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL showing `/isbn/1`
-   Status code: `200 OK`
-   Response showing single book (Things Fall Apart by Chinua Achebe)

**curl Command:**

```bash
curl -X GET http://localhost:5000/isbn/1 -H "Content-Type: application/json"
curl -X GET http://localhost:5000/isbn/8 -H "Content-Type: application/json"
```

**Test ISBNs:**

-   1: Things Fall Apart
-   8: Pride and Prejudice
-   10: The Great Gatsby

---

## Screenshot 3: Get Books by Author

**File:** `3-getbooksbyauthor.png`

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/author/Jane%20Austen
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL showing `/author/Jane%20Austen`
-   Status code: `200 OK`
-   Response showing array with 2 books (Jane Austen's books)

**curl Command:**

```bash
curl -X GET "http://localhost:5000/author/Jane%20Austen" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/author/Chinua%20Achebe" -H "Content-Type: application/json"
```

**Test Authors:**

-   Jane Austen
-   Chinua Achebe

---

## Screenshot 4: Get Books by Title

**File:** `4-getbooksbytitle.png`

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/title/Pride%20and%20Prejudice
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL showing `/title/Pride%20and%20Prejudice`
-   Status code: `200 OK`
-   Response showing single book

**curl Command:**

```bash
curl -X GET "http://localhost:5000/title/Pride%20and%20Prejudice" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/title/Things%20Fall%20Apart" -H "Content-Type: application/json"
```

---

## Screenshot 5: Get Book Reviews

**File:** `5-getbookreview.png`

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/review/1
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL showing `/review/1`
-   Status code: `200 OK`
-   Response showing reviews object (empty `{}` initially)

**curl Command:**

```bash
curl -X GET http://localhost:5000/review/1 -H "Content-Type: application/json"
```

---

## Screenshot 6: Register New User

**File:** `6-register.png`

**Postman Setup:**

```
Method: POST
URL: http://localhost:5000/register
Headers: Content-Type: application/json
Body (raw JSON):
{
  "username": "testuser1",
  "password": "password123"
}
```

**What to capture:**

-   Method: POST
-   URL: `/register`
-   Status code: `200 OK`
-   Response message: "User successfully registered. Now you can login"
-   Request body visible in Postman

**curl Command:**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}'
```

**Test Cases:**

1. New user → 200 OK
2. Same username again → 409 Conflict
3. Missing password → 400 Bad Request

---

## Screenshot 7: User Login

**File:** `7-login.png`

**Postman Setup:**

```
Method: POST
URL: http://localhost:5000/customer/login
Headers: Content-Type: application/json
Body (raw JSON):
{
  "username": "testuser1",
  "password": "password123"
}
```

**What to capture:**

-   Method: POST
-   URL: `/customer/login`
-   Status code: `200 OK`
-   Response message: "Customer successfully logged in"
-   Session cookie in response headers

**curl Command:**

```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}' \
  -c cookies.txt
```

**Important:**

-   After this step, you have a session established
-   Save the session for authenticated requests in Tasks 8-9

---

## Screenshot 8: Add/Modify Book Review

**File:** `8-reviewadded.png`

**Prerequisites:**

-   Must be logged in (do Task 7 first)
-   Session cookie must be present

**Postman Setup:**

```
Method: PUT
URL: http://localhost:5000/customer/auth/review/1?review=This%20is%20an%20excellent%20and%20inspiring%20book
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   Method: PUT
-   URL: `/customer/auth/review/1` with query parameter `review=...`
-   Status code: `200 OK`
-   Response message: "Review successfully added/modified"

**curl Command (with saved session):**

```bash
# Step 1: Login
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}' \
  -c cookies.txt

# Step 2: Add review using session
curl -b cookies.txt -X PUT \
  "http://localhost:5000/customer/auth/review/1?review=This%20is%20an%20excellent%20book" \
  -H "Content-Type: application/json"

# Step 3: Modify same review
curl -b cookies.txt -X PUT \
  "http://localhost:5000/customer/auth/review/1?review=Updated%20review%20-%20Amazing%20book" \
  -H "Content-Type: application/json"
```

**Test Scenarios:**

1. Add new review to book
2. Modify existing review (same ISBN, same user)
3. Add review as different user to same ISBN (creates separate entry)

---

## Screenshot 9: Delete Book Review

**File:** `9-deletereview.png`

**Prerequisites:**

-   Must be logged in (do Task 7 first)
-   Session cookie must be present
-   Should have added a review (Task 8)

**Postman Setup:**

```
Method: DELETE
URL: http://localhost:5000/customer/auth/review/1
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   Method: DELETE
-   URL: `/customer/auth/review/1`
-   Status code: `200 OK`
-   Response message: "Review successfully deleted"

**curl Command (with saved session):**

```bash
# Step 1: Login
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser1","password":"password123"}' \
  -c cookies.txt

# Step 2: Add review
curl -b cookies.txt -X PUT \
  "http://localhost:5000/customer/auth/review/2?review=Test%20review" \
  -H "Content-Type: application/json"

# Step 3: Delete review
curl -b cookies.txt -X DELETE \
  http://localhost:5000/customer/auth/review/2 \
  -H "Content-Type: application/json"

# Step 4: Verify deletion (check reviews)
curl -b cookies.txt -X GET \
  http://localhost:5000/review/2 \
  -H "Content-Type: application/json"
```

**Test Case:**

-   Can only delete own reviews
-   After deletion, username no longer appears in reviews object

---

## Screenshot 10: Get All Books using Async/Await

**File:** `task10.png`

**Split Screenshot Required:**

-   Left side: Postman response
-   Right side: Code from general.js

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/async/all
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL: `/async/all`
-   Status code: `200 OK`
-   Response showing all books

**Code to Show (from general.js):**

```javascript
// Task 10: Get all books – Using async callback function with async/await
public_users.get("/async/all", async (req, res) => {
	try {
		// Simulate async operation by wrapping the books object
		const allBooks = await new Promise((resolve) => {
			resolve(books);
		});
		return res.status(200).json(allBooks);
	} catch (error) {
		return res.status(500).json({ message: "Error retrieving books" });
	}
});
```

**curl Command:**

```bash
curl -X GET http://localhost:5000/async/all -H "Content-Type: application/json"
```

---

## Screenshot 11: Search by ISBN using Promises

**File:** `task11.png`

**Split Screenshot Required:**

-   Left side: Postman response
-   Right side: Code from general.js

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/promise/isbn/1
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL: `/promise/isbn/1`
-   Status code: `200 OK`
-   Response showing book

**Code to Show (from general.js):**

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

**curl Command:**

```bash
curl -X GET http://localhost:5000/promise/isbn/1 -H "Content-Type: application/json"
curl -X GET http://localhost:5000/promise/isbn/8 -H "Content-Type: application/json"
```

---

## Screenshot 12: Search by Author using Promises

**File:** `task12.png`

**Split Screenshot Required:**

-   Left side: Postman response
-   Right side: Code from general.js

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/promise/author/Jane%20Austen
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL: `/promise/author/Jane%20Austen`
-   Status code: `200 OK`
-   Response showing array of author's books

**Code to Show (from general.js):**

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

**curl Command:**

```bash
curl -X GET "http://localhost:5000/promise/author/Jane%20Austen" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/promise/author/Chinua%20Achebe" -H "Content-Type: application/json"
```

---

## Screenshot 13: Search by Title using Promises

**File:** `task13.png`

**Split Screenshot Required:**

-   Left side: Postman response
-   Right side: Code from general.js

**Postman Setup:**

```
Method: GET
URL: http://localhost:5000/promise/title/Things%20Fall%20Apart
Headers: Content-Type: application/json
Body: (none)
```

**What to capture:**

-   URL: `/promise/title/Things%20Fall%20Apart`
-   Status code: `200 OK`
-   Response showing book with that title

**Code to Show (from general.js):**

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

**curl Command:**

```bash
curl -X GET "http://localhost:5000/promise/title/Things%20Fall%20Apart" -H "Content-Type: application/json"
curl -X GET "http://localhost:5000/promise/title/Pride%20and%20Prejudice" -H "Content-Type: application/json"
```

---

## 🎯 Screenshot Creation Workflow

### Method 1: Using Postman

1. Start server with `npm start`
2. Open Postman
3. Create each request
4. Send request
5. Take screenshot (use Snip & Sketch or Print Screen)
6. Save with exact filename

### Method 2: Using curl with Screenshots

1. Start server with `npm start`
2. Open PowerShell
3. Run each curl command
4. Capture terminal output
5. Use Print Screen or Snip & Sketch
6. Save with exact filename

### Method 3: Using Browser DevTools

1. Start server with `npm start`
2. Open browser (Chrome/Firefox)
3. Enter each URL in address bar
4. JSON shows in browser (install JSON formatter if needed)
5. Take screenshot
6. Save with exact filename

---

## 📸 Taking Screenshots in Postman

### Quick Steps:

1. **Alt + Print Screen** - Captures active window
2. Open Paint or Snip & Sketch
3. Paste (Ctrl + V)
4. Crop to show relevant parts
5. Save as PNG
6. Name with exact filename from requirements

### What Must Be Visible:

-   ✅ URL bar (showing endpoint)
-   ✅ HTTP Method (GET, POST, PUT, DELETE)
-   ✅ Status Code (200, 404, 409, etc.)
-   ✅ Response Body (JSON data)
-   ✅ For Tasks 10-13: Also show code in editor

---

## 🔗 Available Books for Testing

```
ISBN 1:  Things Fall Apart (Chinua Achebe)
ISBN 2:  Fairy tales (Hans Christian Andersen)
ISBN 3:  The Divine Comedy (Dante Alighieri)
ISBN 4:  The Epic of Gilgamesh
ISBN 5:  The Book of Job
ISBN 6:  One Thousand and One Nights
ISBN 7:  Njos Saga
ISBN 8:  Pride and Prejudice (Jane Austen)
ISBN 9:  Sense and Sensibility (Jane Austen)
ISBN 10: The Great Gatsby (James Austen)
```

---

## ✅ Final Verification Before Submission

-   [ ] Server starts: `npm start` (no errors)
-   [ ] All 14 endpoints responding (200/404 as expected)
-   [ ] All 14 screenshots taken
-   [ ] Filenames exactly as specified
-   [ ] Screenshots show responses
-   [ ] Tasks 10-13 screenshots include code
-   [ ] Screenshots are readable and clear
-   [ ] All pushed to GitHub
-   [ ] GitHub URL ready for submission

**All tasks complete and ready for peer review! ✅**
