https://www.youtube.com/watch?v=K8YELRmUb5o&t=188s
Getting Started 
Server Folder

Open terminal in project folder. Type,
1. mkdir server
2. cd server
(you will now be in server folder)
3. npm i -g nodemon
(i'm actually just gonna install this locally bc i'm running into problems trying to install globally that i don't wanna fix right now - hopefully this doesn't cause issues)
4. npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
(express for our library, body-parser to process the request body, bcrypt for password encryption, cors for cross-origin requests, dotenv for environment variables, gridfs-stream for file upload, multer and multer-gridfs-storage to upload files locally, helment for request safety, morgan for login(g) - couldn't understand what he said, jsonwebtoken for authentication, and mongoose for mongodb access)

Next, 
1. had to manually update multer in package .json by changing to "multer": "^1.4.5-lts.1" then typing npm install again in terminal
2. put node_modules and .env in .gitignore

In terminal again, type,
1. npm init -y

Next,
1. need to make this module so can just use import instead of require. In package.json add "type": "module" anywhere in there - i put it under main
2. add new file inside server folder called index.js and add a lot of imports so we can use them - see this commit ('setting up dependencies, importing them, and mongo db set up') to see what added to index.js file. Note, during this process you will need to set up mongodb (you've done this before - if need help though look at a previous projects instructions on how to set up mongodb) and put it in .env file (after setup on mongodb website you press connect -> connect to your application (through 'Drivers') -> copy the key, i.e. that connection string into .env with MONGO_URL='' and put string in there but change password -> add PORT=3001 to .env file (we're gonna have front end running on 3000 and backend running on 3001) )
3. add "start": "nodemon index.js" in package.json under scripts
4. Run 'npm start' in server folder in terminal. Should see 'Server Port: 3001'