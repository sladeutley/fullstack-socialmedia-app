https://www.youtube.com/watch?v=K8YELRmUb5o&t=188s
Getting Started

Open terminal in project folder. Type,
1. mkdir server
2. cd server
(you will now be in server folder)
3. npm i -g nodemon
(i'm actually just gonna install this locally bc i'm running into problems trying to install globally that i don't wanna fix right now - hopefully this doesn't cause issues)
4. npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
(express for our library, body-parser to process the request body, bcrypt for password encryption, cors for cross-origin requests, dotenv for environment variables, gridfs-stream for file upload, multer and multer-gridfs-storage to upload files locally, helment for request safety, morgan for login(g) - couldn't understand what he said, jsonwebtoken for authentication, and mongoose for mongodb access)
5. had to manually update multer in package .json by changing to "multer": "^1.4.5-lts.1" then typing npm install again in terminal
6. put node_modules and .env in .gitignore