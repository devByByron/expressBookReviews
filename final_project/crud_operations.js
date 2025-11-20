// This file contains CRUD operations using async/await and promises with Axios

const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books – Using async callback function
const getAllBooksAsync = async () => {
	try {
		console.log("Fetching all books using async/await...");
		const response = await axios.get(`${BASE_URL}/`);
		console.log("All books retrieved successfully:");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching all books:", error.message);
	}
};

// Task 11: Search by ISBN – Using Promises
const searchByISBN = (isbn) => {
	console.log(`Searching for book with ISBN: ${isbn} using Promises...`);
	return axios
		.get(`${BASE_URL}/isbn/${isbn}`)
		.then((response) => {
			console.log("Book found by ISBN:");
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.error("Error searching by ISBN:", error.message);
		});
};

// Task 12: Search by Author – Using Promises
const searchByAuthor = (author) => {
	console.log(`Searching for books by author: ${author} using Promises...`);
	return axios
		.get(`${BASE_URL}/author/${author}`)
		.then((response) => {
			console.log("Books found by author:");
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.error("Error searching by author:", error.message);
		});
};

// Task 13: Search by Title – Using Promises
const searchByTitle = (title) => {
	console.log(`Searching for book by title: ${title} using Promises...`);
	return axios
		.get(`${BASE_URL}/title/${title}`)
		.then((response) => {
			console.log("Book found by title:");
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.error("Error searching by title:", error.message);
		});
};

// Test the CRUD operations
const testCRUDOperations = async () => {
	console.log("=============== Testing CRUD Operations ===============\n");

	// Test get all books with async/await
	console.log("--- Task 10: Get All Books (Async/Await) ---");
	await getAllBooksAsync();

	console.log("\n--- Task 11: Search by ISBN (Promises) ---");
	await searchByISBN("1");

	console.log("\n--- Task 12: Search by Author (Promises) ---");
	await searchByAuthor("Jane Austen");

	console.log("\n--- Task 13: Search by Title (Promises) ---");
	await searchByTitle("Things Fall Apart");

	console.log(
		"\n=============== CRUD Operations Test Complete ==============="
	);
};

// Export functions for use in other modules
module.exports = {
	getAllBooksAsync,
	searchByISBN,
	searchByAuthor,
	searchByTitle,
	testCRUDOperations,
};

// Run tests if this file is executed directly
if (require.main === module) {
	testCRUDOperations();
}
