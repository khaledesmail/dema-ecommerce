# dema-ecommerce-test

This is an e-commerce inventory service implemented in Node.js with TypeScript, GraphQL, and PostgreSQL. The service allows you to manage inventory, list products, and update product information.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
- npm
- PostgreSQL
- Docker

### Run PostgreSQL with Docker Compose

1. make sure you have the `docker-compose.yml` file in the root of your project:

2. Run Docker Compose to start the PostgreSQL instance:

   ```bash
   docker-compose up -d
   ```

   This will start a PostgreSQL container in the background.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khaledesmail/dema-ecommerce-test.git
   cd  dema-ecommerce-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and configure the connection in `dev.env`:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_NAME=dbName
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

5. Load data (optional):

   ```bash
    cd load_data 
    python3 load_inventory.py
    python3 load_order.py 
   ```

Your server will be running at [http://localhost:3000/inventory](http://localhost:3000/inventory).

## Usage

### GraphQL Queries and Mutations

- **List Inventory:**

  ```
  query {
    listInventory(offset: 1, size: 10) {
      name
      quantity
      category
      subCategory
      productId
      orders {
        currency
        quantity
        shippingCost
        amount
        channel
        channelGroup
        campaign
        dateTime
    }
  }
  }
  ```

- **Filter Inventory:**

  ```
  query {
    listInventory(offset: 1, size: 10, category: "Clothing", subCategory: "Jacket", inStock: true) {
      name
      quantity
      category
      subCategory
      productId
      orders {
        currency
        quantity
        shippingCost
        amount
        channel
        channelGroup
        campaign
        dateTime
      }
    }
  }
  ```

- **Update Inventory:**

  ```
  mutation {
    updateInventory(
      productId: "prod1520#prod100011001100"
      name: "x Off White hooded jacket- v2",
      subCategory: "Jacket - v2"
  ) {
    productId
    name
    quantity
    category
    subCategory
    orders {
      productId
      orderId
      currency
      quantity
      shippingCost
      amount
      channel
      channelGroup
      campaign
      dateTime
    }
  }
  }

  ```

- **Sorting Inventory:**

Now We only support quantity sorting
  ```
  query {
      listInventory(offset: 1, size: 10, category: "Clothing", subCategory: "Jacket", inStock: true, sortBy: "quantity", sortOrder: "DESC") {
        name
        quantity
        category
        subCategory
        productId
        orders {
          currency
          quantity
          shippingCost
          amount
          channel
          channelGroup
          campaign
          dateTime
    }
  }
}
  ```

### Filters and Sorting

- You can filter products by `category`, `subCategory`, and `inStock`.
- Sorting can be done only by `quantity` for now.

## Configuration

- Adjust the `dev.env` file for database connection and other configurations.

## Development

- dev run:

  ```bash
  npm run start:dev
  ```

- Build the project:

  ```bash
  npm run build
  ```

- Production run:

  ```bash
  npm run start:prod
  ```


**Additional Enhancements If I Have More Time:**

1. **Orders Sorting:**
   - Implement more robust and flexible sorting options for number of orders placed for a product.

2. **Separate Product Entities:**
   - Introduce a dedicated `Product` entity with detailed product information. Instead of storing all product data in the inventory, establish a relationship between the `Product` and `Inventory` entities. This allows for better organization and scalability.

3. **Dockerization:**
   - Dockerize the service for improved deployment and scalability. 

4. **Error Handling:**
   - Implement a more robust error-handling mechanism.

5. **Unit and Integration Testing:**
   - Develop a comprehensive suite of unit and integration tests to ensure the reliability and stability of the application. This includes testing GraphQL queries, database interactions, and critical business logic.

6. **Logging and Monitoring:**
   - Integrate logging and monitoring solutions to track the application's performance and detect issues early.

7. **Authentication and Authorization:**
   - Implement authentication and authorization mechanisms to secure sensitive operations.