# Postgres and SQL Databases
# Step 1 - Types of Databases:
- The companies which use the NoSQL Databases are mathongo, 100x devs.
- NoSQL database is used when the structures of the databases are not uniform like we want sub entities which are different.
- Firebase is a NoSQL Database. Many companies use firebase database like gathertown.
- Firebase has a problem with scalability(price and speed both).
- Migrating to the SQL database from the NoSQL is difficult.
- MySQL and Postgres are very popular databases used now a days.
- Postgres should be learnt.

💡What all we’ll learn today -
- **Simple** 
  - SQL vs NoSQL.
  - How to create Postgres Databases?
  - How to do CRUD on them?

- **Advance**
  - Relationships, Joins, Transactions

## There are a few types of databases, all service different types of use-cases
## 1. NoSQL databases (No Structured Query Language)
1. Store data in a `schema-less` fashion.
2. `Schema` means the `structure` of the `data`.
3. Extremely lean and fast way to store data.
4. Examples - MongoDB, Fireabse.

<img src="image.png" width=600px height=400px>

### NOTE:
- `MongoDB` is `schema-less` but the `mongoose enforces the schema` at the `NodeJS level`.
- We use mongoose library because the well defined schema saves a lot of trouble in debugging the issue.
- Same thing is with Javascript vs Typescript.

## 2. Graph databases
1. Data is stored in the form of a graph. Specially useful in cases where relationships need to be stored (social networks)
2. Examples - Neo4j

<img src="image-1.png" width=800px height=400px>

## 3. Vector databases
1. Stores data in the form of vectors.
2. Useful in Machine learning.
3. Examples - Pinecone.

<img src="image-2.png" width=800px height=400px>

## 4. SQL databases
1. Stores data in the form of rows.
2. Most full stack applications will use this
3. Examples - MySQL, Postgres.

<img src="image-3.png">


# Step 2 - Why not NoSQL
You might’ve used `MongoDB` 
- It’s `schemaless` properties make it ideal to go for bootstraping a project fast.
- But as your app grows, this property makes it very easy for data to get `corrupted`.
 
## What is schemaless?
- Different rows can have different `schema` (keys/types)
<img src="image-4.png">

## Problems?
1. Can lead to inconsistent database
2. Can cause runtime errors 
3. Is too flexible for an app that needs strictness
 
## Upsides?
1. Can move very fast
2. Can change schema very easily

```text
💡You might think that mongoose does add strictness to the codebase because we used to define a schema there.

That strictness is present at the Node.js level, not at the DB level. You can still put in erroneous data in the database that doesn’t follow that schema.
```

![alt text](image-6.png)

# Step 3 - Why SQL?
SQL databases have a `strict schema`. They require you to:
1. Define your schema.
2. Put in data that follows that schema.
3. Update the schema as your app changes and perform `migrations`.

![alt text](image-7.png)

- Any NodeJS project connected to the PostgreSQL will have the `prisma/schema` file in it.
- It has a `migrations` directory in it, which has the SQL files in which the schema is defined.
- The `migrations/` directory will have the `.sql` files which will have the name as `timestamp_filename.sql`.
- These files are added bases the changes in the Schema of the Database and the timestamp and the name are updated accordingly.
- Firstly the Database Schema is changed then the database is migrated.

![alt text](image-8.png)

So there are 4 parts when using an SQL database (not connecting it to Node.js, just running it and putting data in it)
1. Running the database.
2. Using a library that let’s you connect and put data in it.
3. Creating a table and defining it’s `schema`.
4. Run queries on the database to interact with the data (Insert/Update/Delete).

# Step 4 - Creating a database
- You can start a Potgres database in a few ways - 
## 1. Using neondb
[NeonDB](https://neon.tech/) is a decent service that let’s you create a server.
![alt text](image-9.png)
![alt text](image-10.png)

### Connection String
```cmd
postgresql://username:password@ep-broken-frost-69135494.us-east-2.aws.neon.tech/calm-gobbler-41_db_2253874
```
## 2. Using docker locally
- The below command is to run the PostgreSQL locally with the help of the docker container.
```cmd
    docker run 
        --name my-postgres                      # Name of the Container
        -e POSTGRES_PASSWORD=mysecretpassword   # The name of the Variable
        -d                                      # Detach mode
        -p 5432:5432 postgres                   # Port Mapping
```

### Connection String
```cmd
    postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable
```

## 3. Using docker on windows
### How to run postgreSQL in windows terminal(if you have docker installed)?
- First run docker GUI application that help in running commands in terminal.

- After that run it with the docker instance by the help of following command.

- For the first time if the image is not downloaded.
```cmd
    docker run \
        --name my-postgres1 \                   # Make a container named my-postgres1
        -e POSTGRES_PASSWORD=mysecretpassword\  # Give the environment variable
        -d                                   \  # Run in the detach mode
        -p 5432:5432                         \  # Port Mapping to the 5432 port
        postgres                             \  # Use the Image postgres to make the container

    docker run \
        --name my-postgres1 \
        -e POSTGRES_PASSWORD=mysecretpassword\
        -d                                   \
        -p 5432:5432                         \
        postgres                             \
```

- If the docker image is there, prior to use the it can simply be runned by:
```cmd
    docker start \
        my-postgres1                            # Run the container named my-postgres1
```
- After that use this command in terminal.
```cmd
    docker exec -it my-postgres1 psql -U postgres -d postgres
```
- If the container is killed and still you want to run, start the container again.
```cmd
    docker start my-postgres1
```

- To remove the container entirely and run the container again run the command
```cmd
    docker rm my-postgres1
```

- To stop the container run the command, since kill and stop both are same but kill does the instant termination:
```cmd
    docker stop my-postgres1
            or
    docker kill my-postgres1
```

- Then enter the password and it will connect to localhost Postgress instance.
- Now you will be inside the postress command line that looks like postgres-#.
- Check it by running \\dt , (the command to display all the tables.)

```cmd
💡The connection string is similar to the string we had in mongoose.
```

## Connection String
<img src="image-5.png" width=800px>


# Step 5: Using a library that let’s you connect and put data in it.
1. psql
- `psql` is a terminal-based front-end to PostgreSQL.
- It provides an interactive command-line interface to the PostgreSQL (or TimescaleDB) database.
- With psql, you can type in queries interactively, issue them to PostgreSQL, and see the query results.

## How to connect to your database?
- psql Comes bundled with postgresql.

- You don’t need it for this tutorial.

- We will directly be communicating with the database from Node.js

```cmd
    psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs
```

2. pg
- pg is a Node.js library that you can use in your backend app to store data in the Postgres DB (similar to mongoose).

- We will be installing this eventually in our app.

# Step 6: Creating a table and defining it's Schema

## Tables in SQL
- A single database can have multiple tables inside. Think of them as collections in a MongoDB Collection.

<img src="image-11.png" width=500px>
<img src="image-12.png" width=300px>

- Until now, we have a database that we can interact with. 
- The next step in case of postgres is to define the `schema` of your tables.
- SQL stands for Structured query language.
- It is a language in which you can describe what/how you want to put data in the database.

To create a table, the command to run is - 
```SQL
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
```

- There are a few parts of this SQL statement, let’s decode them one by one.

### 1. `CREATE TABLE users`
`CREATE TABLE users`: This command initiates the creation of a new table in the database named users.

### 2. `id SERIAL PRIMARY KEY`
- `id`: The name of the first column in the users table, typically used as a unique identifier for each row (user). Similar to _id in mongodb

- `SERIAL`: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique id.

- `PRIMARY KEY`: This constraint specifies that the id column is the primary key for the table, meaning it uniquely identifies each row. Values in this column must be unique and not null.

### 3.  `email VARCHAR(255) UNIQUE NOT NULL`,
- `email`: The name of the second column, intended to store the user's username.

- `VARCHAR(50)`: A variable character string data type that can store up to 50 characters. It's used here to limit the length of the username.

- `UNIQUE`: This constraint ensures that all values in the username column are unique across the table. No two users can have the same username.

- `NOT NULL`: This constraint prevents null values from being inserted into the username column. Every row must have a username value.

### 4. `password VARCHAR(255) NOT NULL`
- Same as above, can be non unique

### 5. `created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`
- `created_at`: The name of the fifth column, intended to store the timestamp when the user was created.

- `TIMESTAMP WITH TIME ZONE`: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.

- `DEFAULT CURRENT_TIMESTAMP`: This default value automatically sets the created_at column to the date and time at which the row is inserted into the table, using the current timestamp of the database server.

# Step 7 - Interacting with the database
## There are 4 things you’d like to do with a database
- These are also called the CRUD applications.
- The Non-CRUD applications involve storing the data without database Redis etc.

### 1. INSERT
- Create the Data in the Database.
```SQL
INSERT INTO users (username, email, password)
VALUES ('username_here', 'user@example.com', 'user_password');
```

### 2. UPDATE
- Update the data in the database.
```SQL
UPDATE users
SET password = 'new_password'
WHERE email = 'user@example.com';
```

### 3. DELETE
- Delete the data from the database.
```SQL
DELETE FROM users
WHERE id = 1;
```

### 4. Select
- Read the data from the database.
```SQL
SELECT * FROM users
WHERE id = 1;
```

```text
💡Try running all 4 of these in your terminal if you have psql  installed locally.
   If not, that’s fine we’ll eventually be doing these through the pg  library
```

# Step 8 - How to do queries from a Node.js app?
- In the end, postgres exposes a protocol that someone needs to talk to be able to send these commands (update, delete) to the database.

- `psql`  is one such library that takes commands from your terminal and sends it over to the database.

- To do the same in a Node.js , you can use one of many `Postgres clients `

## pg library
- [Link to the pg library](https://www.npmjs.com/package/pg) 
- Non-blocking PostgreSQL client for Node.js.
- Pure JavaScript and optional native libpq bindings.
- [Documentation of the node-postgres.](https://node-postgres.com/)

### Making a Project to connect to the database:
- Initialize the project and yes to all the defaults.
- Install all the typescript package.
- Initialize the typescript configuration in the project.

```cmd
    npm init -y
    npm install typescript
    npx tsc --init
```

- Create the `src/index.js` file in the project folder.
- Install the pglibrary, we use the @types/pg because it brings the types of the typescript library as well.
```cmd
    npm install pg @types/pg
```
- Write the code to connect with the database in the `index.ts` file.
- Add the dev script in the package.json file.
- The following command converts the index.ts to the index.js.
```cmd
    npm tsc -b
```
- Then run the code using the following command
```cmd
    npm run node ./dist/index.js
```

- Add the type : "module" in the `package.json` file.
```js
    /* Get the Instance of the pg library */
    import { Client } from "pg";

    /* Initialize the pgClient */
    const pgClient = new Client({
        user: "postgres",
        password: "mysecretpassword",
        port: 5432,
        host: "localhost",
        database: "postgres"
    });

    async function main() {
        await pgClient.connect();
        const res = await pgClient.query("SELECT * FROM users;");
        console.log(res);
    }

    main();
```

### Connecting -
```ts
import { Client } from 'pg'
 
const client = new Client({
  host: 'my.database-server.com',
  port: 5334,
  database: 'database-name',
  user: 'database-user',
  password: 'secretpassword!!',
})

client.connect()
```

### Querying -
```ts
const result = await client.query('SELECT * FROM USERS;')
console.log(result)
```

```ts
// write a function to create a users table in your database.
import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

createUsersTable();
```

# SQL Injection:
- We can pass a SQL query like `DELETE` in the arguments of the Insert Query.
- We can pass the arguments like:
```json
{
    "username": "rohitramchandasaani123",
    "email": "ramchandani.rohit16@gmaiwqwl.com",
    "password": "'); DELETE * FROM users;"
}
```
- This will make the query like:
```SQL
    INSERT INTO 
            users
            (username, email, password)
            VALUES
            ('rohitramchandasaani123', 'ramchandani.rohit16@gmaiwqwl.com', ''); DELETE * FROM users;');
```

- We can give any set of queries in the above syntax.

## Fix
```js
        const insertQuery = `INSERT INTO 
        users 
        (username, email, password)
        VALUES 
        ('$1', '$2', '$3');`;

        const response = await pgClient.query(insertQuery, [username, email, password]);
```
- Write the query in the code like the above code.