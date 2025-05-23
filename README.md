
---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sarangkale66/Billeasy-Junior_Backend_Engineer-Task
cd Billeasy-Junior_Backend_Engineer-Task
```

This `README.md` provides two ways to set up the application:

* Using **Docker Compose**
* Using a **local system setup**

---

### 🐳 Using Docker Compose

Run the following commands one by one to set up and run the application:

```bash
docker compose build
docker compose run app npm run db:migrate
docker compose up
```

---

### 💻 Using Local System Setup

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up PostgreSQL

You can either run PostgreSQL locally or use a cloud provider.

**A. Using Docker (local PostgreSQL)**

```bash
docker run --name app_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=app_db \
  -p 5432:5432 \
  -d postgres
```

**B. Using Cloud PostgreSQL**
Use services like [Neon](https://neon.tech), [Supabase](https://supabase.com), [Aiven](https://aiven.io), etc., and get a connection URL.

---

#### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

> 🔐 Replace `"your_jwt_secret"` with a secure, random secret key.

---

#### 5. Initialize Prisma

```bash
npm run db:migrate
npx prisma db seed # optional: populate with dummy data
```

---

#### 6. Start the Server

```bash
npm run dev
```

Your API will be running at `http://localhost:5000`.

---

## 🧪 API Endpoints Overview

### 🔐 Auth

* `POST /signup` – Register a user
  ![Signup](./images/Signup.png)

* `POST /login` – Login and receive a JWT
  ![Login](./images/Login.png)

---

### 📚 Books

* `POST /books` – Add a book *(auth required)*
  ![Add Book](./images/Books2.png)

* `GET /books?page={number}&limit={number}` – List books with pagination/filtering
  ![Books Pagination](./images/Books1.png)

* `GET /books/:id` – Get book details with average rating and reviews
  ![Book Details](./images/Books4.png)

* `POST /books/:id/reviews` – Submit a review *(auth required, one per user/book)*
  ![Submit Review](./images/Books3.png)

---

### ✍️ Reviews

* `PUT /reviews/:id` – Update your review *(auth required)*
  ![Update Review](./images/ReviewUpdate.png)

* `DELETE /reviews/:id` – Delete your review *(auth required)*
  ![Delete Review](./images/ReviewDelete.png)

---

### 🔍 Search

* `GET /search?query=someTitleOrAuthor` – Search books by title or author (case-insensitive)
  ![Search](./images/Search.png)
