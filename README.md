# RanjanTools - Student Utility Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.2-purple.svg)
![AntDesign](https://img.shields.io/badge/Ant_Design-5.17-orange.svg)

**RanjanTools** is a modern, privacy-focused student utility platform designed to provide essential document and image processing tools without compromising user data. Built using the MERN stack (MongoDB, Express, React, Node.js), it prioritizes client-side processing to ensure that sensitive files never leave the user's browser.

## 🚀 Features

- **Privacy First**: Most tools (PDF conversion, image resizing, ID card merging) process files locally in the browser using `pdf-lib` and Canvas API.
- **Modern UI**: Styled with **Ant Design 5**, featuring a clean, responsive layout with **Dark & Light Mode** support.
- **Multilingual**: Supports both **English** and **Hindi** to assist students in rural areas.
- **Fast Performance**: Powered by **Vite** for a blazing-fast development and user experience.
- **Comprehensive Toolset**:
    - 📄 **PDF to JPG Converter**
    - 🖼️ **JPG to PNG Converter**
    - 📏 **Image Resizer**
    - 👤 **Profile Picture Generator**
    - 🪪 **ID Card Joiner**
    - 📅 **Date on Photo Tool**
    - 🔗 **PDF Merger**
    - 🔄 **Image Converter & Compressor**

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Ant Design 5, Framer Motion, Zustand (State Management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for the review/feedback system)
- **Localization**: i18next
- **File Processing**: pdf-lib, react-easy-crop, react-dropzone

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ranjan-tools.git
   cd ranjan-tools
   ```

2. **Install dependencies:**
   ```bash
   npm run install:all
   ```

3. **Environment Variables:**
   Create a `.env` file in the `server` directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the project:**
   ```bash
   # Run both client and server
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! If you'd like to add a new tool or fix a bug, please:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Developed with ❤️ for students.
