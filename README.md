# eCommerce Project with React and Redux, Bootstrap.
![ecommerce page](![Screenshot (128)](https://github.com/irinamihai150/shop/assets/104944750/a1624529-bdc1-4595-a312-96e98e124f9a)
)
## Overview
This project is an eCommerce application built using React and Redux. It follows [Build an eCommerce platform from the ground up with React, Redux Toolkit, Express & MongoDB(Udemy- Brad Traversy)] for implementation.
### Customer/User Features:
1. **Browse Products:**
   - View a list of available products with details such as name, price, and images.

2. **Product Details:**
   - Click on a product to view detailed information, including images, descriptions.

3. **Add to Cart:**
   - Easily add products to the shopping cart for future checkout.

4. **Manage Cart:**
   - Review, update, and remove items from the shopping cart before proceeding to checkout.

5. **Place an Order:**
   - Complete the purchase by providing shipping details and placing an order.

6. **Make a Payment:**
   - Securely make payments using integrated payment methods.

### Admin Features:
1. **Admin Dashboard:**
   - Access a dashboard with an overview of orders, users, products.

2. **Add New Products:**
   - Add new products to the inventory, including details such as name, price, and images.

3. **Edit Product Information:**
   - Modify existing product details, such as price, description, and stock.

4. **Delete Products:**
   - Remove products from the inventory when necessary.

5. **Manage Orders:**
   - View and manage customer orders, update order status.
### General Features:
1. **Responsive Design:**
   - Enjoy a seamless experience on a variety of devices, including desktops, tablets, and smartphones.

2. **Authentication:**
   - Secure user authentication for both customers and admin users.

3. **Error Handling:**
   - Gracefully handle errors and provide informative messages to users.

4. **Search Functionality:**
   - Easily search for products based on keywords.

5. **Optimized Performance:**
   - Benefit from a fast and optimized application performance.



## Project Structure
## Project Structure

The project follows a standard React project structure, with additional directories for Redux state management and backend server files. Here's a brief overview:

### `/src` Directory:

- **`/src/components`:**
  - Contains reusable React components used throughout the application.

- **`/src/screens`:**
  - Houses the main screens or pages of the application, such as Home, Product Details, and Checkout.

- **`/src/redux`:**
  - Manages the Redux state for the application.
    - `/src/redux/actions`: Action creators for dispatching actions.
    - `/src/redux/reducers`: Reducers that manage the state changes.
    - `/src/redux/store.js`: Redux store configuration.

- **`/src/services`:**
  - Includes utility functions or services, such as API calls and data processing.

- **`/src/styles`:**
  - Contains global styles or styling variables used throughout the application.

- **`/src/App.js` and `/src/index.js`:**
  - Entry points for the React application.

### `/public` Directory:

- **`/public/index.html`:**
  - The main HTML file where the React app is mounted.

### `/backend` Directory:

- **`/backend/server.js`:**
  - Backend server configuration and route handling.

- **`/backend/routes`:**
  - Express route handlers, including orderRoutes.js for managing orders.

### Other Files:

- **`package.json`:**
  - Configuration file with project dependencies and scripts.

- **`.gitignore`:**
  - Specifies files and directories to be ignored by version control.

- **`README.md`:**
  - This file, providing project documentation and setup instructions.
