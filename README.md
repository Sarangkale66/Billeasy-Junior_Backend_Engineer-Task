Here's a clean and developer-friendly `README.md` setup section so anyone can clone and run your project smoothly with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and **JWT**:

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL (Docker)

If you don’t have PostgreSQL locally, you can run it using Docker:

```bash
docker run --name app_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=app_db \
  -p 5432:5432 \
  -d postgres
```

### 4. Configure Environment Variables

Create a `.env` file in the root with the following content:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

> 🔐 Replace `"your_jwt_secret"` with a secure secret key.

### 5. Initialize Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Start the Server

```bash
npm run dev
```

Your API will now be running at `http://localhost:5000`.

---

## 🧪 API Endpoints Overview

### Auth

* `POST /signup` – Register user
* `POST /login` – Login and get JWT token

### Books

* `POST /books` – Add book *(auth required)*
* `GET /books` – Get all books with pagination/filter
* `GET /books/:id` – Get book details with average rating + reviews
* `POST /books/:id/reviews` – Submit review *(auth, one per user)*

### Reviews

* `PUT /reviews/:id` – Update your own review *(auth)*
* `DELETE /reviews/:id` – Delete your own review *(auth)*

### Search

* `GET /search?query=someTitleOrAuthor` – Case-insensitive search by title/author

---

Let me know if you'd like to include a `Postman` collection or Swagger/OpenAPI docs!
