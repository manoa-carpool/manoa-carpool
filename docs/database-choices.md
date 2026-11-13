
# Database Choice for Manoa Carpool

## Options Considered

### PostgreSQL with Prisma
PostgreSQL is a relational database that works well with connected data such as users, rides, ride requests, ratings, and reports. Prisma makes database queries easier in Next.js using TypeScript.

### SQLite
SQLite is simple and easy to set up, but it is less suitable for a deployed application with many users making changes at the same time.

### MongoDB
MongoDB is flexible and stores information as documents. However, our application has many relationships, which are easier to manage using PostgreSQL.

### Firebase Firestore
Firestore offers cloud hosting and real-time features, but it would require our team to learn a different database system and design around its document structure.

## Final Decision

We chose PostgreSQL with Prisma because it supports relationships, works with Next.js, and is already familiar to our team from ICS 314.

### Database Hosting Plan

We chose PostgreSQL with Prisma for the Mānoa Carpool application. PostgreSQL will store user profiles, rides, ride requests, ratings, and reports. Prisma will help our Next.js application communicate with the database.

For deployment, we will create the PostgreSQL database through Vercel's Storage tab using Neon as the database provider. Neon will host the PostgreSQL database, while Vercel will host our Next.js application.

We will use pgAdmin to connect to the hosted database and check its tables and data, following the E59/E60 deployment process.

The database connection will be stored securely using environment variables instead of putting credentials directly into our code.
