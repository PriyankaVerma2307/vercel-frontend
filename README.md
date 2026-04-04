# 🎵 Bhajan App

A simple and efficient web application to manage bhajans for satsangs. This app allows users to add, view, edit, and delete bhajans while ensuring no repetition within a single satsang and maintaining structured records.

---

## 🚀 Features

* Add bhajans with details:

  * Bhajan Name (Hindi / Hinglish)
  * Singer Name
  * House Name (Satsang)
  * Date

* 📋 View all bhajans in a clean table format

* 🔍 Search bhajans (API-based search)

* ✏️ Edit bhajan details using modal popup

* ❌ Delete bhajans with confirmation

* 🔁 Prevent duplicate bhajans in the same satsang

* 📄 Pagination support for large data

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS (Custom styling)

### Backend

* Node.js
* Express.js
* MongoDB

### Authentication

* JWT (JSON Web Token)

---

## 📂 Project Structure

```
Bhajan-App/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── styles/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-link>
cd Bhajan-App
```

### 2. Setup Backend

```
cd backend
npm install
npm start
```

### 3. Setup Frontend

```
cd frontend
npm install
npm start
```

---

## 🔐 Login Credentials (Demo)

> You can use the following credentials to login:

* **Email:** gents
* **Password:** Pass123

---

## 📌 Rules Implemented

* ❗ No duplicate bhajan allowed within a single satsang
* 🔄 Bhajans should not repeat until multiple satsangs (future enhancement)
* 📅 Each entry must include house name and date

---

## 📸 Screens (Optional)

(Add screenshots of your app here if required for submission)

---

## 🎯 Purpose

This project is built to simplify bhajan management during satsangs and avoid repetition while maintaining organized records.

---

## 🙌 Author

Priyanka

---

## ⭐ Note

This project is built for learning.
