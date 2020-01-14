# Flask Note Taker

A note-taking app using Flask, MongoDB and React

## Getting Started

### Configure Credentials

The database connection credentials should be stored inside a credentials.py file in the same folder as app.py. It should contain a dictionary called data with a property called "mongo_uri" that contains the mongoDB connection string.

Example:
```
data = {'mongo_uri':'mongo_connection_string_goes_here'}
```

### Installing

Ensure you have the proper python modules installed by running the following pip command:
```
pip install -r requirements.txt
```

In the frontend directory, install nodejs modules with:
```
npm install
```


## Deployment

Start up the backend by running the following command:
```
python app.py
```

Deploy the frontend for production with:
```
npm run build
```

Or in development move with:
```
npm start
```