# Next JS (Last Class):
- The last class was all about the Client Side rendering.

- We created a NextJS application, Server Side Rendering, understood that the ReactJS is not good for Search Engine Optimization, but the NextJS is good/great for SEO.

- We discussed about the Client Component vs Server Components.

## Why frontend should be written in NextJS not in ReactJS?
1. It is good for Search Engine Optimization.
2. It caches the pages faster.
3. We can distribute it via a CDN as well.

## When ReactJS should be used?
1. When we want cheaper alternatives to deploy the application, using CDNs etc.
2. In NextJS only some parts can be distributed via a CDN.

## Mid way :
- Make the landing page in HTML/CSS/JS and the other pages can be in the ReactJS.
- Like Neon.tech is in the HTML/CSS/JS but the real dashboard can be in ReactJS.

<img src="image.png" width = 500px>

## Step 1: Next JS (Backend):
- It is a full stack framework.

<img src="image-1.png" width = 500px>

- This means the same process can handle frontend and backend code.

- Frontend is returning the HTML Page.

<img src="image-2.png" width = 500px>

- Backend is returning the JSON Object in the NextJS.
- In the MERN application it is returned by the Express Servers.

<img src="image-3.png" width = 500px>

### Specifications:
1. Both the Backend and the Frontend are in the same repository.

2. We can use the CORS(Cross Origin Requests) securely in the NextJS, untill now we were using the CORS in a very unsecure way, We should restrict the CORS to some specific domains.

3. No cors issues, single domain name for your FE and BE, because the origin is same.

4. Ease of deployment, deploy a single codebase.

### MERN Stack Deployment
- We deploy the React Application on the S3 bucket which is the object store.
- We deploy the NodeJS Application on the AWS-EC2.
- We have 2 different deployment pipelines.

<img src="image-5.png" width = 500px>

## NextJS Deployment
- The NextJS code is deployed to the same Virtual Machine.

<img src="image-4.png" width = 500px>

## Step 2 Recap of Data fetching in React:
- Let’s do a quick recap of how data fetching works in React

```text
💡We’re not building backend yet, Assume you already have this backend route -  https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details
```

- Code - https://github.com/100xdevs-cohort-2/week-14-2.1
- Website - https://week-14-2-1.vercel.app/

### User Card Website
- Build a website that let’s a user see their name and email from the given endpoint

<img src="image-6.png" width = 500px>

- Waterfalling happens in this, it is not SEO optimized.
- The first request has nothing which the landing page makes, has only div element having a root.
- Then it calls the js file which further displays the content.
- Google crawler does not go to that extent, it only sees the home page.
- This is why the React is not SEO Optimized.

### UserCard component
<img src="image-7.png" width = 500px>

- We have state variables.
- If the page is not loaded then the Spinner is displayed like the Shimmer UI.
- If the page is loaded the the Card is rendered.
- Whenever the component mounts, the useEffect() runs and the data is fetched from the backend.
- React Query makes the life easy. 

### Data fetching happens on the client in ReactJS
<img src="image-8.png" width = 500px>

## Step 3 Data fetching in Next:
- [Reference to NextJS ](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

```text
💡You can do the same thing as the last slide in Next.js, but then you lose the benefits of Server Side Rendering.
```

- You should fetch the user details on the server side and `pre-render` the page before returning it to the user.

<img src="image-9.png" width = 800px>

### Building the application:
#### 1. Intialize the empty project.

```bash
  npx create-next-app@latest
```

#### 2. We will select the settings:
<img src="image-10.png" width = 500px>

#### 3. Output of the Project after the clean up of the `page.tsx` and `global.tsx`
   - We can see the page at http://localhost:3000/
   - The page.tsx has the content of the landing page.

```ts
    /* app/page.tsx */
    import Image from "next/image";

    export default function Home() {
      return (
        <div>
        </div>
      );
    }
```
   - The empty landing page will have the above code.

#### 4. Install the axios package
```ts
  npm install axios
```

#### 5. We can also create the routes with the help of the folder structure. We can create the [Sign In Page](http://localhost:3000/signin) by creating a folder signin in the `app/signin` and create a landing page called `page.tsx`.

#### 6. The useEffect() is not a good way to fetch the data in the NextJS Application. Like the code given below:

#### 7. When we use the hooks like useState() or useEffect() then we have to convert the Component into the client component because the component is server component by default. We can convert the component to client component using the following code.

```ts
  "use client"

  import axios from "axios";
  import { useEffect, useState } from "react";

  export default function User() {

      /* The state variables to check the loading and to get the data */
      const [loading, setLoading] = useState(true);
      const [data, setData] = useState();

      const fetchData = async () => {
          try {
              const res = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
              const data = await res.data;
              setData(data);
              setLoading(false);
          }
          catch (err) {
              console.log(err);
          }
      }

      /* Call the useEffect() for the data fetching */
      useEffect(() => {
          fetchData();
      }, []);


      if(loading) {
          return <div>
              loading...
          </div>
      }

      return <div>
          User Page
          {data?.name}
          {data?.email}
      </div>
  }
```

#### 8. The above front end component can be easily converted to the server component as follows, it will prerender the HTML Page:
```ts
  import axios from "axios";

  export default async function User() {

      const res = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");

      const data = await res.data;

      return <div>
          User Page
          {data?.name}
          {data?.email}
      </div>
  }
```
- Check the network tab, make sure there is no waterfalling

<img src="image-11.png" width=800px>

- **Prettify the UI:**
```ts
  import axios from "axios";

  async function getUserDetails() {
    const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
    return response.data;
  }

  export default async function Home() {
    const userData = await getUserDetails();

    return (
      <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
              <div className="border p-8 rounded">
                  <div>
                      Name: {userData?.name}
                  </div>
                  
                  {userData?.email}
              </div>
          </div>
      </div>
    );
  }
```

#### 9. Code will be cleaner with the use of the Server Side Rendering the Request will be send to the NextJS and the page will be given to the browser.

#### 10. We can also connect to the database from the Server Component.

## Step 4: Loaders in NextJS: (Loader is also know as the Shimmer UI)
- What if the `getUserDetails` call takes 5s to finish (lets say the backend is slow). You should show the user a `loader` during this time.

- If the website requires to show the loading of the page then create the `loading.tsx` otherwise do not create the `loading.tsx` file.

<img src="image-12.png" width=700px>

### loading.tsx file:
- Just like `page.tsx` and `layout.tsx`, you can define a `skeleton.tsx` file that will render until all the async operations finish.

1. Create a `loading.tsx` file in the root folder.
2. Add a custom loader inside
```ts
  export default function Loading() {
      return <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
              Loading...
          </div>
      </div>
    }
```

## Step 5 - Introducing api routes in Next.js
- NextJS lets you write backend routes, just like express does. This is why Next.js is considered to be a `full stack` framework.

- The benefits of using NextJS for backend includes :-
1. Code in a single repo.
2. All standard things you get in a backend framework like `Express.js`
3. Server components can directly talk to the Backend.

## Step 6 - Let’s move the backend into our own app
- We will take the reference from the Backend API -> https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details.

- It has the structure -> [api -> v1 -> user -> details -> page.tsx], so we will create the structure of the routes as these only -> [api/v1/user/details/page.tsx].

- We want to introduce a route that returns `hardcoded` values for a user’s details (email, name, id).

1. Introduce a new folder called `api`.
2. Add a folder inside called `user`.
3. Add a file inside called `route.ts` which is used to write the backend code.
4. Initialize a `GET` route inside it.
5. The `page.tsx` is used to write the front end component to be returned.
 
```ts
  /* route.tsx */
  export async function GET() {
    return Response.json(
      { 
        username: "rohit",
        email: "ramchandani.rohit16@gmail.com"
        }
    )
  }

  export async function POST() {
    return Response.json(
      { 
        username: "rohit",
        email: "ramchandani.rohit16@gmail.com"
        }
    )
  }

  export async function PUT() {
    return Response.json(
      { 
        username: "rohit",
        email: "ramchandani.rohit16@gmail.com"
        }
    )
  }

  export async function DELETE() {
    return Response.json(
      { 
        username: "rohit",
        email: "ramchandani.rohit16@gmail.com"
        }
    )
  }
```

5. Try replacing the api call in `user/page.tsx` to hit this URL.
```ts
  async function getUserDetails() {
    try {
      /* We can give the local host url */
      const response = await axios.get("http://localhost:3000/api/user")

      return response.data;
    }  catch(e) {
      console.log(e);
    }
  }
```

```text
  💡This isn’t the best way to fetch data from the backend. 
  We’ll make this better as time goes by
```

## What is the difference between the `default export` and the `named export`?
- default export is used when there is only one Component is returned from the file.
- default export is imported like `./component`.
- named export are imported like `import { component }`.

## Why the request and the response so quick?
- It is because the frontend and the backend is on the same server i.e. Next.js server.

## Create the Main Page for the Application.
- In the `app/page.tsx` create the 2 buttons, on which we will create the routing.
- There are two ways to do the routing:-
```ts
  // 1. Good way to do the routing
  <Link href="/signin">
    Sign In to Todo app
  </Link >
```

```ts
  // 2. Bad Way to do the routing
  // Make the component as client
  "use client"

  // Import the useRouter component
  import {useRouter} from the "next/navigation"; 
  const router = useRouter();

  {/* Button 1 */}
  <button onClick={() => {
    router.push("/signin")
  }
  }>SignIn</button>
```

## Step 7 - Frontend for Signing Up and Signing In
1. Create `app/signup/page.tsx`.

2. Create a simple Page
```ts
  import { Signup } from "@/components/Signup"

  export default function() {
      return <Signup />
  }

              OR

  /* Create a folder /app/signup/page.tsx */
  "use client"

  import axios from "axios";
  import { useState } from "react";

  export default function SignUp() {
      const [username, setUserName] = useState("");
      const [password, setPassword] = useState("");

      return (
          <div className="w-screen h-screen flex justify-center items-center">
              <div className="border p-2">

                  {/* 1. Fill the username and password with the help of the state variable */}
                  {/* Input Boxes controlled by the state variables */}
                  <input type="text" placeholder="username" onChange={e => {
                      setUserName(e.target.value);
                  }} />

                  {/* Input Boxes controlled by the state variables */}
                  <input type="password" placeholder="password" onChange={e => {
                      setPassword(e.target.value);
                  }} />


                  {/* 2. Make the API Call when the Button is clicked */}
                  <button onClick={() => {
                      axios.post("http://localhost:3000/api/v1/signup", {
                          username,
                          password
                      })
                  }}>
                      Sign In
                  </button>

              </div>
          </div>
      )
  }
```
  - We can use the state varaibles to pass the username and the password.
  - Or we can use some other libraries as well.

3. Create `components/Signup.tsx`

4. Convert `components/Signup.tsx` to a client component
```ts
  "use client"
```

5. Add a `onclick handler` that sends a `POST request` to `/user`
```ts
  <button onClick={async () => {
      const response = await axios.post("http://localhost:3000/api/user", {
          username,
          password
      });
      
  }} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
```

6. Route the user to landing page if the signup succeeded. [Ref useRouter() hook](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook)

7. Final `signup.tsx`
```text
💡We still have to implement the backend route, lets do that in the next slide
```

---

## Step 8 - Backend for signing up
- Add a `POST` route that takes the users email and password and for now just returns them back.

1. Create the path and navigate to `app/api/user/route.ts`
2. Initialize a POST endpoint inside it.
```ts
  import { NextRequest, NextResponse } from 'next/server';

  export async function POST(req: NextRequest) {
      const body = await req.json();
      return NextResponse.json({ username: body.username, password: body.password })
  }
```

- [Reference Link for API](https://nextjs.org/docs/app/api-reference/functions/next-response)

<img src="image-16.png" width=700px>

<img src="image-17.png" width=700px>

- Now there comes the feature of authentication using the NextAuth framework.
- We will now be using the prisma to push the data in the database in the sign up API route.

---

## Step 9 - Databases!
- We have a bunch of dummy routes, we need to add a database layer to persist data.
- Adding prisma to a Next.js project is straightforward.
- Go to the neon.tech

```text
💡Please get a free Postgres DB from either neon or aiven
```

<img src="image-13.png" width=700px>

### 1. Install prisma
- Install the prisma package which is the ORM which we are using.
```bash
  npm install prisma
```

- Go to the `neon.tech`, Go to the Projects -> `New Project` -> Name the database as `database-class-week-19`.

- Click on the option connect to the database, then copy the database URL.

### 2. Install prisma schema
- This means create a directory `prisma` and a schema file for prisma in it with the following command.

```bash
  npx prisma init
```

### 3. Create a simple user schema
- In the `prisma/schema.prisma` file create a model using the code given below.

```postgres
  model User {
    id        Int     @id  @default(autoincrement())
    username  String  @unique
    password  String
  }
```

### 4. Replace the `.env` with your Postgres URL
- Replace the database URL in the `Project/.env` file.
```ts
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

### 5. Migrate the database
- We are only building the model in `prisma/schema.prisma`, and the `npx prisma migrate dev --name init_schema` command generates the SQL to create/update the tables, saves that SQL inside a timestamped migration folder, and runs it on the database — so we don’t need to write SQL by hand.

- To migrate the database `install` the `dotenv` package first and in the `prisma.config.ts` import the `dotenv` package.

```bash
  # Install the dotenv file
  npm install dotenv

  # Migrate the database
  npx prisma migrate dev --name init_schema
```

```ts
  /* import the dotenv package to access the database URL */
  import "dotenv/config";
```

- The database is migrated that means table are created in the database and the logs are also stored in the migration folder.

### 6. Generate the client
- The `npx prisma generate` command reads the `schema.prisma` and generate the client code fot the app to connect to the database.
- Client code is what lets us connect the app to the database in the typesafe way.
- `prisma-client-js` library helps us to create the client based on the model in the `schema.prisma`.

```bash
  npx prisma generate
```

- The Output folder line of code should be removed from the `schema.prisma` from the generator section, otherwise the following code will not work.
```ts
  generator client {
    provider = "prisma-client-js"
    output   = "../app/generated/prisma"  ❌❌❌
  }
```

```ts
  import { PrismaClient } @prisma/client;
```

### 7. Finish the SignUp Route
- Now we can connect to the database using the client code in the Prisma in the route.ts.

```ts
  export async function POST(req: NextRequest) {

      /* Get the data from the client : req */
      const body = await req.json();
    
      /* Should add zod validation here */

      /* Add the user to the database */
      const user = await client.user.create({
          data: {
              username: body.username,
              password: body.password
          }
      });

      console.log(user.id);

      /* Return the response to the client back */
      return NextResponse.json(
        { 
          message: "Signed up" 
        }
      );
  }
```

- After this we will be able to signup from the front end and then store the data in the database.

### 8. Update the GET endpoint
```ts
  export async function GET() {
      const user = await client.user.findFirst({});
      return Response.json({ name: user?.username, email: user?.username })
  }
```

```text
💡We’re not doing any authentication yet. Which is why we’re not returning a jwt (or setting a cookie) here
```

## Step 10 - Better fetches
- For the root page, we are fetching the details of the user by hitting an HTTP endpoint in `getUserDetails`

### 1. Current solution
```ts
  /* Root Page */
  import axios from "axios";

  async function getUserDetails() {
    try {
      /* Hitting the own server's HTTP endpoint while using the NextJS application */
      const response = await axios.get("http://localhost:3000/api/user")
      return response.data;
    }
    catch(err)
    {
      /* Log the error */
      console.log(err);
    }
  }

  /* Home component */
  export default async function Home() {

    /* Calling the function to get the data */ 
    const userData = await getUserDetails();

    return (
      <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
              <div className="border p-8 rounded">
                  <div>
                      Name: {userData?.name}
                  </div>
                  
                  {userData?.email}
              </div>
          </div>
      </div>
    );
  }
```

- `getUserDetails` runs on the server. This means you’re sending a request from a server back to the server.
- In case of the React Application this was required but in the case of the NextJS the Client and the Server component both are running on the server so we need not do this.

<img src="image-14.png" width=700px>

### 2. Better Solution
```ts
  /* Root Page */
  import { PrismaClient } from "@prisma/client";

  const client = new PrismaClient();

  async function getUserDetails() {
    try {
      /* Now, we are not hitting the own API endpoint since, we are using the NextJS application */
      const user = await client.user.findFirst({});
      return {
        name: user?.username,
        email: user?.username
      }
    }
    catch(err)
    {
      /* Log the error */
      console.log(err);
    }
  }

  /* Home component */
  export default async function Home() {

    /* Calling the function to get the data */ 
    const userData = await getUserDetails();

    return (
      <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center">
              <div className="border p-8 rounded">
                  <div>
                      Name: {userData?.name}
                  </div>
                  
                  {userData?.email}
              </div>
          </div>
      </div>
    );
  }
```

## Step 11 - Singleton prisma client
- Hot reloading happens in the NextJS application, the application re-compiles again and again even for a small change in the component.

- If the component makes the call to the database, there will be too many connections to the database.

- Even though this problem happens in the dev mode, but to resolve this problem we use the `singleton prisma client`.

- This is for the local development only not for the development on the production.

- [Reference Client](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

### 1. Create `lib/db/index.ts`

### 2. Add a prisma client singleton inside it
```ts
  import { PrismaClient } from '@prisma/client'

  /* This function returns a new instance to the prisma client */
  const prismaClientSingleton = () => {
    return new PrismaClient()
  }

  declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
  }

  /* We are using the globalThis.prisma because we are using backend otherwise we would have used the window.prisma */
  const prisma = globalThis.prisma ?? prismaClientSingleton()

  if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
  
  export default prisma
```

```ts
import { PrismaClient } from "../generated/prisma/client"

/* This function returns a new instance to the prisma client */
const prismaClient = () => {
    return new PrismaClient()
}

/* We are using the globalThis.prisma because we are using backend otherwise we would have used the window.prisma */
const prisma = globalThis.prisma ?? prismaClient()

/* This problem is not in production mode it is in dev only */
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
```

### 3. Update imports of prisma everywhere
```ts
  import prismaClient from "../../../lib/db";
```

## Step 12 - Server Actions
- [Reference Document](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) 

- Right now, we wrote an `API endpoint` that let’s the user sign up

```ts
  export async function POST(req: NextRequest) {
      const body = await req.json();
      // should add zod validation here
      const user = await client.user.create({
          data: {
              username: body.username,
              password: body.password
          }
      });

      console.log(user.id);

      return NextResponse.json({ message: "Signed up" });
  }
```

- What if you could do a simple function call (even on a `client component` that would run on the server?) (similar to `RPC`)

```text
  💡Under the hood, still an HTTP request would go out. But you would feel like you’re making a function call
```

### Steps to follow
1. Create `actions/user.ts` file (you can create it in a different folder).
2. Write a function that takes username and password as input and stores it in the DB.
```ts
  "use server"

  import client from "@/db"

  export async function signup(username: string, password: string) {
      // should add zod validation here
      const user = await client.user.create({
          data: {
              username: username,
              password: password
          }
      });

      console.log(user.id);

      return "Signed up!"
  }
```
3. Update the `Signup.tsx` file to do the function call
```ts
import { signup } from "@/actions/user";;

...

<button onClick={async () => {
    const response = await signup(username, password);
    localStorage.setItem("token", response);
    router.push("/")
}} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
```

### Check the network tab

<img src="image-15.png" width=500px>

### Benefits of server actions
1. Single function can be used in both client and server components
2. Gives you types of the function response on the frontend (very similar to trpc)
3. Can be integrated seamlessly with forms [Reference Link](https://www.youtube.com/watch?v=dDpZfOQBMaU).
