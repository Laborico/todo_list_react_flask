# ToDo App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

**Status** : :construction:Under development :construction:

A simple ToDo app that lets you create, edit and delete tasks:D.

https://todo-list-react-flask.herokuapp.com/

## Why React and Flask?

Well, for a bit of time I wanted to created an app using both of the frameworks. The lack of in-depth tutorials and examples discourage me to do it. But I needed an app to showcase how to add Cypress to a CI/CD pipeline and I had a long weekend a head, so, why not kill two birds with one stone?:D

## How to run

#### Requirements:

```bash
npm >= 16.14.0
python >= 3.8.0
```

#### Steps:

1. (Suggestion) Create a [virtual environment](https://www.tutorialspoint.com/how-to-create-a-virtual-environment-in-python) for python.
2. Run `pip install -r requirements.txt` on the terminal (this will install all the needed python packages needed).
3. Then, run `npm install` on the terminal (this will install all the needed node packages needed).
4. To start the server run `flask run`.
5. Go to 127.0.0.1:5000 (or localhost:5000) and you should see the app in there:D



#### Why so many APIs?

Besides needing an app to show Cypress on a CI/CD pipeline, I needed and API to show how to test them, so why not expand a bit on this project:D

**v1**

This is the base API, it does everything that the app needs

```
- Register/Creates users
- Search users
- Delete users
- Create tasks
- Get tasks from users
- Update/modify tasks
- Delete tasks
```

**v2**

Has the same methods from v1 (even calls the functions), but uses JWT authentication, is the one used by the front end

```
- Login for users (access token)
- Refresh access token
- Gets identity from token
- The rest of the functioanlity is the same as v1
```

**v3**

Has the same methods from v1 (even calls the functions), but uses Basic Authentication, you have to send the credentials on the header

```
- Login for users (username and password)
- The rest of the functioanlity is the same as v1
```

**v4**

Has the same methods from v1 (even calls the functions), but uses API key 123456790, you can send the key either on the header or the params

```
- Same functioanlity as v1
```

### Your changes are not showing up?

When running an app with a normal implementation of React + Flask, you'll notice it requires you to run two servers, one for React and another one for Flask. But this app only requieres you to run the Flask server. That's because I changed some configurations on React to make it work more freely with Flask.

#### React

Every time you make a change to React code, you'll need to run `npm run build` and restart the Flask server (or run `export FLASK_ENV=development` on the terminal to enable automatic template updates and avoid restarting the server itself).

#### Flask

Every time you make a change to Flask code, you'll need to restart the server (or run `export FLASK_ENV=development` on the terminal to enable the auto reload).



## Tests

As I mentioned, I needed an app to showcase how to add Cypress to a CI/CD pipeline, therefore all the test are on Cypress.

Run `npx cypress run` to run all the tests or `npx cypress open` to open Cypress and run a specific test suite.

### Known issues:

- Refresh token not working from UI

- Validating if user is logged in not workin from UI

- Errors not showing on UI (i.e invalid email on login)

- Every API call error is not being caught

- Not fully responsive

- ~~Some placeholders still on place~~

- Login not being the landing page

  

[License](#LICENSE)

