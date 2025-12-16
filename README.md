# ⏳ Time Capsule

> **Stow away your memories for a future day.**

A full-stack web application that allows users to create digital time capsules. Messages remain securely locked and hidden until their specific unlock date arrives.

🔴 **Live Demo:** [View Live App](https://time-capsule-ed0p.onrender.com)

---

## 📸 Screenshots

<img width="890" height="855" alt="image" src="https://github.com/user-attachments/assets/3cf2a838-b3ad-4681-bbd6-7acfbfb6c875" />


---

## 🚀 Features

- **🔒 Time-Lock Logic:** Capsules are encrypted/hidden on the server until the target date is reached.
- **☁️ Persistent Storage:** All data is stored securely in MongoDB Atlas.
- **🎨 Modern UI:** Built with Tailwind CSS for a responsive, dark-mode aesthetic.
- **⚡ Live Updates:** Real-time feedback with loading states and animations.
- **📱 Responsive:** Works on desktop and mobile.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- Vanilla JavaScript (ES6+)
- Tailwind CSS (via CDN)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Deployment:**
- Render (Web Service)

---

## ⚙️ Local Setup

If you want to run this project on your own machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_GITHUB_USERNAME/time-capsule.git](https://github.com/YOUR_GITHUB_USERNAME/time-capsule.git)
    cd time-capsule
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/timecapsule?retryWrites=true&w=majority
    ```

4.  **Run the Server**
    ```bash
    node server.js
    ```

5.  **Open in Browser**
    Visit `http://localhost:3000`

---

## 📂 Project Structure

```text
/time-capsule
├── public/
│   ├── index.html      # Main UI
│   ├── app.js          # Frontend Logic (Fetch API)
├── server.js           # Backend API & Database Connection
├── package.json        # Project Dependencies
└── README.md           # Documentation File
```

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the **MIT License**. 

You are free to use, modify, and distribute this software as long as the original copyright notice and license are included. See the [LICENSE](LICENSE) file for more details.

