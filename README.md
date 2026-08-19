# 🏋️ IronGem Client

IronGem is a modern gym management system built with Angular.

The application allows users to browse gym courses, enroll in courses,
manage their profiles, and review courses.

Administrators can manage users, courses, offers, and enrollments.

## 🚀 Features

### Authentication
- User registration
- User login
- JWT authentication
- Logout
- Role-based authorization

### Courses
- View all courses
- View course details
- Enroll in a course
- View enrolled courses

### Reviews
- Add a review
- Rate courses
- View course reviews

### Offers
- View available offers
- View discounted course prices

### Admin
- Manage users
- Manage courses
- Manage offers
- Manage enrollments

## 🛠️ Technologies

- Angular 18
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- Reactive Forms
- HTTP Client
- JWT Authentication

## 📁 Project Structure

src/app/
│
├── core/
│   ├── guards/
│   ├── interceptors/
│   └── services/
│
├── shared/
│   ├── components/
│   └── models/
│
├── features/
│   ├── auth/
│   ├── home/
│   ├── courses/
│   ├── offers/
│   ├── reviews/
│   ├── profile/
│   └── admin/
│
├── app.component.ts
├── app.component.html
├── app.component.css
└── app.routes.ts