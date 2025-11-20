const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require("axios");
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (!isValid(username)) {
			users.push({ username: username, password: password });
			return res
				.status(200)
				.json({
					message: "User successfully registered. Now you can login",
				});
		} else {
			return res.status(409).json({ message: "User already exists!" });
		}
	}
	return res.status(400).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	const isbn = req.params.isbn;
	if (books[isbn]) {
		return res.status(200).json(books[isbn]);
	} else {
		return res.status(404).json({ message: "ISBN not found" });
	}
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	const author = req.params.author;
	let result = [];
	for (let key in books) {
		if (books[key].author.toLowerCase() === author.toLowerCase()) {
			result.push(books[key]);
		}
	}
	if (result.length > 0) {
		return res.status(200).json(result);
	} else {
		return res.status(404).json({ message: "Author not found" });
	}
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	const title = req.params.title;
	let result = [];
	for (let key in books) {
		if (books[key].title.toLowerCase() === title.toLowerCase()) {
			result.push(books[key]);
		}
	}
	if (result.length > 0) {
		return res.status(200).json(result);
	} else {
		return res.status(404).json({ message: "Title not found" });
	}
});

// Get book review
public_users.get("/review/:isbn", function (req, res) {
	const isbn = req.params.isbn;
	if (books[isbn]) {
		return res.status(200).json(books[isbn].reviews);
	} else {
		return res.status(404).json({ message: "ISBN not found" });
	}
});

// ===================== ASYNC/AWAIT AND PROMISES IMPLEMENTATION =====================

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

module.exports.general = public_users;
