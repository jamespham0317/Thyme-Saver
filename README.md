# Thyme Saver Web Application

## Introduction
**Thyme Saver** is an application for users who want to find recipes for their favourite foods. As a student living away from home, I'm burdened with the responsibility of cooking 
for myself. Having lived alone for several years now, I've grown a liking for cooking and find myself looking for new recipes to try. In this project, I wanted to make this process 
easier for me and for other individuals in my situation. The application is deployed [here](https://thymesaver.up.railway.app/).

## Features 

### Image Upload Recipe Generation
Users can upload an image file of the food item for which they'd like to learn the recipe for. Upon submission of the image, the application identifies the name of the food item 
uploaded. A recipe for the food item is then generated and displayed for the user with the required ingredients and instructions.

### Registration and Login
Users can register for an account, entering their name, email, and a password. Users can then login to their account using their email and password, allowing them to view the number 
of recipes they have added to their "arsenal."

## Tech Stack
- Frontend: React
- Backend: Node.js, Google Gemini API, BCrypt, Multer
- Database: PostgreSQL
- Hosting: Railway
