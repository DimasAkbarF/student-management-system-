# Student Management System

A comprehensive web-based application designed to manage student data efficiently. This system demonstrates the practical implementation of fundamental computer science algorithms (searching and sorting) within a modern full-stack web architecture. It is built using Next.js and MongoDB, focusing on performance, SEO optimization, and clean architecture.

## Technologies Used

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **Database**: MongoDB (via Mongoose ODM)
- **Deployment**: Vercel

## Key Features

### 1. Authentication & Security
- Secure login system using custom JWT-based session management.
- Protected routes utilizing Next.js Middleware.
- Cookie-based session handling with standard security flags (HttpOnly, Secure, SameSite).

### 2. Student Data Management (CRUD)
- **Create**: Add new student records with validation.
- **Read**: View comprehensive lists of students with pagination.
- **Update**: Edit existing student details.
- **Delete**: Remove student records individually or bulk delete.

### 3. Algorithm Demonstrations
The application serves as an educational tool by implementing various data structure algorithms from scratch:

**Sorting Algorithms:**
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Shell Sort

**Searching Algorithms:**
- Linear Search
- Binary Search (Recursive and Iterative)

### 4. Advanced Data Features
- **Data Import/Export**: Capability to export student data to JSON format and import data from JSON files for backup or migration.
- **Statistics**: specific dashboard showing total students, average GPA, and department distribution.

### 5. SEO & Performance
- **Search Engine Optimization**: Fully optimized with dynamic metadata, canonical URLs, and XML sitemaps.
- **Robots.txt**: configured for optimal crawler access.
- **Performance**: Achieves perfect scores (100) in Lighthouse metrics for SEO, Accessibility, and Best Practices.

### 6. User Interface
- **Responsive Design**: Fully adaptable layout for desktop and mobile devices.
- **Theme Support**: Built-in dark and light mode toggle.
- **Modern UI**: Clean, professional interface suitable for academic environments.

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   JWT_SECRET=your_secure_secret_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Configure the `MONGODB_URI` and `JWT_SECRET` environment variables in the Vercel dashboard.
4. Deploy.

The specific Vercel configuration (headers, caching policies) is already handled in `next.config.ts`.

## Project Structure

- `/src/app`: Application routes and pages.
- `/src/components`: Reusable UI components.
- `/src/lib`: Utility functions, database connections, and models.
- `/src/services`: Business logic and algorithm implementations.
- `/src/middleware.ts`: Request interception and route protection.
- `/public`: Static assets (images, robots.txt).

## License

This project is open source and available under the MIT License.
