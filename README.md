# TaDa - frontend
## Breakable toy

TaDa is a simple to-dos app. The frontend was built with React

<img src="./reactjs.png"  width="60" height="60">

To run the server do (after running npm install):

```
npm run start
```

To run the tests do:

```
npm run test
```

To configure backend address, edit src/config/api.js file, by default it is set to localhost on port 9090

```javascript
export const API_ADDRESS = "http://localhost";
export const PORT = "9090";
export const CORS_MODE = "cors"; // no-cors, *cors, same-origin
```