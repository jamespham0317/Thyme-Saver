# Thyme Saver 

**Thyme Saver** is a full-stack web application that helps users discover recipes from images of their favorite foods. Designed with students and busy individuals in mind, it simplifies the process of finding something new to cook — no typing required.

Deployed live at [thymesaver.com]([https://thymesaver.up.railway.app/](http://thyme-saver-frontend.s3-website.us-east-2.amazonaws.com/))

---

## Why I Built This

As a student living away from home, I'm burdened with the responsibility of cooking for myself. Having lived alone for several years now, I've grown a liking for cooking and find myself looking for new recipes to try. With **Thyme Saver**, I wanted to streamline this process for me and for other individuals in my situation.

---

## Features

### Image-Based Recipe Generation
Users can upload a photo of a dish they’re interested in. The application identifies the food item in the image using AI, then returns a full recipe complete with ingredients and step-by-step instructions.

### User Registration & Login
Users can create an account with their name, email, and password. Once logged in, they can view the number of recipes they've generated — building their personal "cookbook."

---

## Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | React                                        |
| Backend     | Node.js, Express, Google Gemini API          |
| Auth/Upload | Bcrypt, Multer                               |
| Database    | PostgreSQL                                   |
| Hosting     | S3, Lambda, API Gateway, RDS                 |
