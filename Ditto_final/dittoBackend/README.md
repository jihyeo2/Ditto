## **Setup**

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

After you have followed the official document for installation, make sure you stopped mongb service and restarted it using the following command:  
  
 `mongod`  
  
 Now, allow the access of all the files in mongodb to users other than the root:  
  
 `sudo mkdir -p /data/db`  
  
 `` sudo chown -R `id -un` /data/db ``  
  
 At last, leave it running as it is while you run the backend files.

### Install the Dependencies

Next, from the project folder, install the dependencies:

`npm i`

### (Optional)(Currently not provided) Populate the Database

`node seed.js`

### (Optional)(Currently not provided) Run the Tests

You're almost done! Run the tests to make sure everything is working:

`npm test`  
  
 All tests should pass.

### Start the Server

`node index.js`  
  
 This will launch the Node server on port 9000. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:9000/api/stores

You should see the list of stores. That confirms that you have set up everything successfully.

### Environment Variables

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac&linux:

`export ditto_jwtPrivateKey=yourSecureKey`

On Windows:

`set ditto_jwtPrivateKey=yourSecureKey`
