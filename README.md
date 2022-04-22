# Hobbsify – A serverless spotfy implementation 
As a personal challenge I have decided to try and create a serverless Spotify clone.

## Stack
* React/Next.js
* Typescript
* A bootstrapped UI for speed (undecided on which one)
* Postgres for db 
* Prisma

### Success Criteria
* Should have user login/authentication 
* Artist library 
* Songs should be associated to each Artist 
* Playlist creation with association to each user 
* Song playback 
* Runs serverless with hosted database 

### Prisma 
First time using prisma to update db and schema (auto generates SQL structure). 
So far very cool experience, especially regarding seeding data – added seed script to package.json 


Following commands to modify or update db: 
* `npx prisma migrate dev` – pushes schema updates (essentially a git commit to the db)
* `npx prisma push` 
* `npx prisma pull`
* `npx prisma studio` 

### Postgres DB is hosted on Google Cloud 
* Normally wouldn't include .env file but to run locally it is in here with the access credentials
 

#### State 

Management using easy-peasy library as lightweight alternative to Redux.

#### React Howler
Component to handle the song timelines similar to Web Audio API & HTML Player only with more controls for UI (wish it was a hook but couldn't find anything that exists)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.





