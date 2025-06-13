# Salumi-Tracker

Introducing [Salumi-Tracker](https://salumitracker.com/): Your Ultimate Companion for Perfecting Salumi Recipes!

Salumi-Tracker is an innovative web application designed to elevate your salumi-making experience. Seamlessly adapt your recipes to perfection and effortlessly monitor your salumi in production. Whether you're a seasoned artisan or a passionate hobbyist, Salumi-Tracker empowers you to create exceptional salumi with precision and ease.

Join the community of salumi enthusiasts and take your craft to the next level with Salumi-Tracker!

## Tech Stack
### Frontend 
- Framework: Next.js (React)
- Styling: Tailwind CSS, CSS
- State Management: Recoil
- Data Fetching: React Query
- Routing: useRouter (Next.js)

### Backend
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- Containerization: Docker, Docker Compose
- Authentication: JWT

### Other Tools and Libraries
- Email Service: Nodemailer

## Key Features
- Creating multiple recipes and salumi
- Track the progress of the salumi in production
- Rate completed salumi and track your average score
- Dynamic ingredient ratio calculation
- Email notifications

## Screenshots
![Dashboard](https://github.com/leonhardSensi/salumiTracker/assets/108275034/8abc6826-eef6-49bd-9d96-138b1feb3ef0.png)
*Dashboard showing the overview of salumi being cured*

![Recipe Adjustment](https://github.com/leonhardSensi/salumiTracker/assets/108275034/4a261419-1a8d-45e1-a647-f5ff41ea76c2.png)
*Dynamic recipe adjustment ensuring precise ingredient ratios*

## To Dos
- UI improvements
- ARIA support
- Mobile support
- Recipe sharing
- Multilingual support
- Search and filtering
- User feedback system

## Frontend

### Prerequisites

Before running the frontend of Salumi-Tracker, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm: Included with Node.js

### Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/leonhardSensi/salumiTracker
    ```

2.  Navigate to the frontend directory:

    ```bash
    cd your-repo/salumiTracker/frontend
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Usage

Start the development server:

```bash
npm run dev
```

After running the command, visit http://localhost:3000 in your web browser to access the application

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Backend

### Prerequisites

Before running the backend of Salumi-Tracker, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org)
- npm: Included with Node.js
- Docker: [Download Docker](https://www.docker.com)
- Docker Compose: Included with Docker

### Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/leonhardSensi/salumiTracker
    ```

2.  Navigate to the backend directory:
    ```bash
    cd your-repo/salumiTracker/backend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Database Setup

Salumi-Tracker uses PostgreSQL as the database.

1. Navigate to the root of the project:

   ```bash
   cd your-repo/salumiTracker/backend
   ```

2. Run the PostgreSQL and Redis Docker Containers:

```bash
docker-compose up -d
```

### Schema migrations

Make sure the database is running.

#### Create Migrations

```bash
npm run migrate
```

#### Run Migrations

```bash
npm run db:push
```


### Usage

Start the backend server:

```bash
npm run start
```

The backend will be available at http://localhost:8000

