# Student Management System

## Overview

The Student Management System is a comprehensive web-based application designed to facilitate the efficient management of student data. Built with modern web technologies, this system provides administrators with robust tools for data entry, retrieval, and analysis, ensuring data accuracy and accessibility.

## Key Features

### Dashboard
- **Real-time Statistics**: Provides an immediate overview of total students, average GPA, department distribution, and algorithm metrics.
- **Data Visualization**: Presents key metrics through clear, professional scorecards.
- **Quick Actions**: Streamlined access to frequently used functions such as adding students or searching records.

### Student Management
- **CRUD Operations**: Complete capability to Create, Read, Update, and Delete student records.
- **Search Functionality**: Advanced search features utilizing various algorithms (Linear, Binary, etc.) to locate records efficiently.
- **Sorting Mechanisms**: Implementation of multiple sorting algorithms (Bubble Sort, Merge Sort, etc.) for data organization.

### Technical Architecture
- **Framework**: Next.js 16 (React Framework)
- **Database**: MongoDB using Mongoose ODM
- **Styling**: Tailwind CSS
- **Authentication**: Custom session-based authentication

## Algorithms Implemented

The system demonstrates the practical application of several fundamental computer science algorithms:

### Search Algorithms
- Linear Search
- Binary Search
- Sequential Search

### Sort Algorithms
- Insertion Sort
- Merge Sort
- Bubble Sort
- Selection Sort
- Shell Sort

## Installation and Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/student-app.git
    cd student-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your MongoDB connection string:
    ```
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000`.

## Deployment

This project is optimized for deployment on Vercel.

1.  Push the code to a Git repository.
2.  Import the project into Vercel.
3.  Configure the `MONGODB_URI` environment variable in the Vercel dashboard.
4.  Deploy.

## License

This project is licensed under the MIT License.
