# AutoCraftAI

A full-stack AI-powered platform built with the **PERN stack** (PostgreSQL, Express.js, React.js, Node.js).

---

## 🧠 What It Does

AutoCraftAI provides creators with smart AI tools for:

- ✍️ Generating blog titles  
- 🧾 Resume reviewing  
- 🧼 Removing image backgrounds  
- ❌ Removing objects from images  
- 🖼️ AI image generation  
- 📄 Summarizing content  

---

## 🔐 Authentication & Plans

- Uses **Clerk Auth** for secure user authentication  
- Users can **sign up for Free or Premium plans**  
- Profile pictures and plan changes (Free ↔ Premium) handled via Clerk's built-in functions  

---

## ☁️ Image & Data Handling

- **Cloudinary** is used for all image uploads  
- **ClipDrop API** and **Gemini API** are used to power AI features  
- **Neon PostgreSQL** is used to store:
  - User request logs  
  - Operation history  
- **Clerk** manages and stores user identities securely  

---

## 💻 Frontend

- Built with **React.js + Vite**  
- Responsive design for **mobile and desktop users**  
- Uses **React Hooks** and **Axios** for API communication  

---

## 🛠️ Stack

- **Frontend**: React.js, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (via Neon)  
- **Authentication**: Clerk  
- **Cloud Storage**: Cloudinary  
- **AI APIs**: ClipDrop, Gemini  

