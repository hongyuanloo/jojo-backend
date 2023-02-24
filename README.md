# Jojo (E-commerce web app)

This is a PERN(PostgreSQL, Express, React, and Node) full stack web application created for General Assembly's SEIF (Software Engineering Immersive Flex) Bootcamp program as final project. This is backend portion of web app; backend portion can be found [here](https://github.com/hongyuanloo/jojo-frontend).

Jojo is an e-commerce platform that list all products online. Logged in user can add product to cart, make stripe payment and track purchased orders. Thanks to JWT auto-refresh authentication, every transaction is secured. To provide better user experience, redux persist is used to persist user data on local storage. With this featur logged in user can continue to shopping even after web page is refreshed or reopened.

## Tech Stack / Libraries

These are tools used in this project.

Frontend:

- [React](https://reactjs.org/)
- [React TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- [React Router](https://reactrouter.com/en/main)
- [React Redux](https://react-redux.js.org/)
- [Redux Persist](https://www.npmjs.com/package/redux-persist)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [Axios](https://axios-http.com/)
- [Stripe Payment API](https://stripe.com/docs/development)

Backend:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [jsonwebtoken](https://jwt.io/)
- [http-status](https://www.npmjs.com/package/http-status)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

Database:

- [PostgreSQL](https://www.postgresql.org/)

Application Hosting:

- Frontend is hosted at [vercel](https://jojo-frontend.vercel.app/).

- Backend is hosted at [cyclic](https://jojo-backend.cyclic.app/).

- Database is hosted at [render](https://dashboard.render.com/).

### Installation Instructions:

Frontend:

1. Clone frontend repo.
2. Install all required modules using `npm install` if you are using node package manager.
3. Create a `.env` file in the root of your project. Inside the file add the following:
   ```
   REACT_APP_API_BASEURL=http://localhost:8000/v1
   ```
4. `npm start` to launch application.

Backend:

1. Clone backend repo.
2. Install all required modules using `npm install` if you are using node package manager.
3. Create a `.env` file in the root of your project. Inside the file add the following:

   ```
   # Backend server port no.
   PORT=8000

   # Connection to postgresql database
   DATABASE_URL=postgresql://YOURUSERNAME:YOURPASSWORD@localhost:5432/YOURDATABASENAME

   # Secret tokens for JWT
   ACCESS_TOKEN_SECRET=YOURSECRETKEYFORACCESSTOKEN
   REFRESH_TOKEN_SECRET=YOURSECRETKEYFORREFRESHTOKEN

   # Life span of JWT tokens
   REFRESH_TOKEN_LIFESPAN=ANYNUMERICALVALUE e.g. 3600
   ACCESS_TOKEN_LIFESPAN=ANYNUMERICALVALUE e.g. 300

   # stripe
   STRIPE_PRIVATE_KEY = YOURSTRIPEAPIKEY

   # Front end url : for local development
   CLIENT_URL = http://localhost:3000
   ```

4. `npm run migrate` to sync prisma schema with postgreSQL database schema.
5. `npm run generate` to generate latest Prisma Client that is tailored to your database schema. Prisma Client is used to manipulate your database.
6. `npm run startdev` to start server.

## Project Description

### Requirements/Inputs Gathering:

1. **User stories** were developed in early project stage to describe important features to be included in the project.

   - User Story 1: As a "professional" shopper, I like to browse products online, see my cart, make payment and track my order anytime.

   - User Story 2: As a user, I would like to have see "featured" products on carousel and products categories.

   - User Story 3: As a smartphone user, I like to shop using my phone.

   - User Story 4: As a user, I like to ensure that my transaction is safe.

   - User Story 5: As a user, I might accidentally refresh or close my browser.

2. Translation of user stories into **Main Features** that our web application should have:

   - Form to create a new user account and login.
   - My cart page to view added cart items.
   - My orders page to track purchased orders.
   - Stripe checkout function to make payment.
   - Carousel to display "featured" products.
   - List all products categories in cards.
   - Mobile first web app.
   - Persist data in SQL database.
   - JWT is used for authentication and for accessing protected API end points. Auto-refresh JWT is used to streamline user experience.
   - Persist data on local storage so that user do not need to relogin in the event web page is reopened or refreshed.

3. **Wireframes** were developed to facilitate visualization.

   Home Page Wireframe

   ![Home Page Wireframe](./images/wireframe-home-page-.PNG)

   My Cart Page Wireframe

   ![My Cart Page Wireframe](./images/wireframe-mycart-page-.PNG)

   My Orders Page Wireframe

   ![My Orders Page Wireframe](./images/wireframe-myorders-page-.PNG)

4. **ERD (Entity Relationship Diagram)** and **API end points** were designed and developed.

   ERD (Drawn using Lucid)

   ![ERD](./images/ERD.PNG)

   APIs end points

   ![APIs end points](./images/APIs-end-points.PNG)

### Features:

\*\* Following images are all displayed in smartphone screen size.

Home Page

![Home Page Navigation part 1](./images/webapp-home-page-navigation-part_1.PNG)

![Home Page Navigation part 2](./images/webapp-home-page-navigation-part_2.PNG)

![Home Page Categories](./images/webapp-home-page-categories.PNG)

![Home Page Products](./images/webapp-home-page-products.PNG)

![Home Page Footer](./images/webapp-home-page-navigation-part_2.PNG)

- Announcement Bar
  - Bouncing with "Free Shipping on Orders...".
- Navigation Bar
  - Logo: onClick to home.
  - Light/Dark mode toggle button.
  - User icon: to login page.
  - cart icon: shows total cart items.
  - drawer: navigation to other pages.
- Carousel
  - Images of featured products auto slides in infinite loop.
- Categories
  - List all available categories.
- Products
  - List all available products.
  - Click "+" to add item to cart.
- Footer
  - My Account: navigate to other pages.
  - Follow us: let's connect :)

My Cart Page

![My Cart Page](./images/webapp-mycart-page.PNG)

![Stripe Checkout Page](./images/webapp-mycart-page-stripe-checkout.PNG)

![Stripe Payment Success](./images/webapp-stripe-payment-success.PNG)

- My Cart
  - Add, minus or delete cart item.
  - Checkout to stripe payment.

My Orders Page

![My Orders Page](./images/webapp-myorders-page.PNG)

- My Orders
  - List all purchased orders.

Login Page

![Login Page](./images/webapp-login-page.PNG)

Create Account Page

![Login Page](./images/webapp-create-account-page.PNG)

JWT Authentication:

- Authentication is done at backend using JWT access token.
- Upon login, access and refresh tokens will be issued. These tokens are then stored in local storage of client browser.
- Every request made to protected APIs require access token which is stored in Authorization Header of request object in "bearer token" format.
- Typically, access token has much shorter life span than refresh token. If expired, refresh token can be used to get new access token. If refresh token is expired, access to protected APIs would be forbidden and relogin is required.
- With Axios request interceptor, before any request to protected APIs is sent, interception is made to check the expiration of access token. If expired, new access token would be obtained using refresh token. Subsequently, request to protected APIs is sent with new access token. All these process are done using the same instance of Axios.

Redux Persist:

- Fetched data are persisted on local storage of client browser. Accidental refresh or reopen of browser tab doesnt require user to relogin.

Typescript:

- Typescript is used in both frontend and backend to ensure type safe during compilation. This has greatly reduce debugging time.

### Area of Improvement:

- Allow user to reset password.
- Add search bar, products filtering and sorting.
- Allow user to add review or comments to every event.
- Create new form for Admin access to manipulate database data.
- Improve APIs response time.
- Consolidate all frontend, backend and database into a docker image.

## Contact

I would appreciate any comments and feedback anyone has.
You can reach me at loohongyuan5505@hotmail.com.
