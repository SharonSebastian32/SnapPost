# SnapPost - Social Media Platform for Wildlife Photographers

SnapPost is a dynamic and engaging social media platform designed for wildlife photographers to share their work with the world. Built with security, performance, and user experience in mind, SnapPost offers a seamless environment for photographers to post and engage with content while ensuring data privacy.

## Features

- **Post Sharing:** Share your wildlife photographs and posts with the SnapPost community. Showcase your work with an intuitive and visually appealing interface.
- **Secure Login/Logout System:**

  - SnapPost offers a robust authentication system with encrypted password handling, ensuring user data protection.
  - User sessions are secure and can be easily managed with a simple login and logout process.

- **Tested with Rapid API Client:**
  - Our APIs are thoroughly tested with the Rapid API Client to ensure security, reliability, and performance.
- **Data Privacy and Encryption:**
  - User data, including passwords, is stored securely with advanced encryption techniques, making sure all sensitive information is protected.

## Technologies Used

- **Frontend:** React.js, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), bcrypt for password encryption
- **API Testing:** Rapid API Client
- **Version Control:** Git, GitHub

## Installation

To run SnapPost locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com//SnapPost.git
   cd SnapPost
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and add the following variables:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

5. **Access the application:**  
   Open your browser and navigate to `http://localhost:3000` to explore SnapPost locally.

## Usage

- Sign up to create an account or log in with your existing credentials.
- Upload your wildlife photography posts, share them with the community, and engage with other photographers.
- Log out securely when you're done using the application.

## Contribution

We welcome contributions! To contribute to SnapPost, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or collaboration, feel free to reach out at:  
**Email:** sharonsebastian81@gmail.com**
