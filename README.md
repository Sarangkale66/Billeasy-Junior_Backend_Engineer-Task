Here's a clean and developer-friendly `README.md` setup section so anyone can clone and run your project smoothly with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and **JWT**:

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sarangkale66/Billeasy-Junior_Backend_Engineer-Task
cd Billeasy-Junior_Backend_Engineer-Task
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL 
- using (Docker)

If you don’t have PostgreSQL locally, you can run it using Docker:

```bash
docker run --name app_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=app_db \
  -p 5432:5432 \
  -d postgres
```

- using Cloud Postgres URL from Avien.io, neon.tech, supabase etc

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
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
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

![/signup](./images/Signup.png)

* `POST /login` – Login and get JWT token

![/login](./images/Login.png)

### Books

* `POST /books` – Add book *(auth required)*

![/books](./images/Books2.png)

* `GET /books?page={number}&limit={number}` – Get all books with pagination/filter

![/books](./images/Books1.png)

* `GET /books/:id` – Get book details with average rating + reviews

![/books/:id](./images/Books4.png)

* `POST /books/:id/reviews` – Submit review *(auth, one per user)*
![/books/:id/reviews](./images/Books3.png)


### Reviews

* `PUT /reviews/:id` – Update your own review *(auth)*
![/reviews/:id](./images/ReviewUpdate.png)

* `DELETE /reviews/:id` – Delete your own review *(auth)*
![/reviews/:id](./images/ReviewDelete.png)

### Search

* `GET /search?query=someTitleOrAuthor` – Case-insensitive search by title/author

![/reviews/:id](./images/Search.png)

---

Let me know if you'd like to include a `Postman` collection or Swagger/OpenAPI docs!
