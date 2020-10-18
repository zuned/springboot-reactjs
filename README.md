# springboot-reactjs

	npx create-react-app my-app - this will create new project name my-app
	npm start -> To start server.
  
- [quick installation click here](https://github.com/facebook/create-react-app)

**Folder Structure**

	package.json --> is similar to pom file
	node-module  --> where all library is stored
	src --> will contain all the react code
	public --> contians index.html

	ReactDOM.render(
	  <React.StrictMode>
	    <App />
	  </React.StrictMode>,
	  document.getElementById('root')
	);
	
In the above code the app component is replaced at element have id root.

**JSX**
**Class Components**
**Function Components**

- To add router dependency

	**npm add react-router-dom**
- For changing default port of react application, we need to edit the pakage.json

	for window > "start" : "SET PORT=4200 react-scripts start"
	for mac > "start" : "PORT=4200 react-scripts start"
	
- For resetful service integeration we can use [AXIOS](https://github.com/axios/axios)
	
	for adding run command> npm add axios
	
- **[AXIOS](https://github.com/axios/axios)** uses **[PROMISE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** For Eventful completion of asynchronous application.


