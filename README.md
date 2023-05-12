
# Blog API

This is a Node.js API for a simple blog application, built with Express and MongoDB. It includes endpoints for user authentication and CRUD operations on blog posts.

## Getting Started

1. Clone the repository:

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">git clone <repository-url>
   </code></div></div></pre>
2. Install dependencies:

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">npm install
   </code></div></div></pre>
3. Set up environment variables:
   The app requires the following environment variables to be set:

   * `DB_URI`: URI of the MongoDB database
   * `PORT`: Port number on which the server should listen

   You can create a `.env` file in the project root and add these variables:

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-env">DB_URI=your DB URI
   PORT=3000
   </code></div></div></pre>
4. You can start the server with Nodemon: (It monitors your project directory and automatically restarts your node application when it detects any changes)

   <pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">nodemon server
   </code></div></div></pre>

   The server should now be running at `http://localhost:3000`.

## API Documentation

The API includes the following endpoints:

* `/register` - [POST] - Register a new user
* `/login` - [POST] - Authenticate a user
* `/posts` - [POST] - Create a new blog post (requires authentication)
* `/posts/{id}` - [PUT] - Edit a blog post (requires authentication)
* `/posts` - [GET] - Retrieve all blog posts, sorted by date (in desc by default) (optionally filtered by user, requires authentication)
  * Example: localhost:3000/posts?asc=true&onlyOwn=true
* `/posts/{id}` - [GET] - Retrieve a specific blog post by ID (requires authentication)
* `/posts/{id}` - [DELETE] - Delete a specific blog post by ID (requires authentication)

### Authentication

Authentication is required for certain endpoints (marked above). To authenticate, include a JSON Web Token (JWT) in the `Authorization` header of the request:

<pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-makefile">Authorization: Bearer <JWT>
</code></div></div></pre>

The JWT should be obtained by sending a POST request to the `/login` endpoint with valid user credentials. The response will include a JWT token, which should be stored on the client-side and included in subsequent requests to authenticated endpoints.

## Contributing

If you find a bug or would like to suggest a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
