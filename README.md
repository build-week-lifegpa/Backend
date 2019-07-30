# Backend

NOTES: 
All data is required unless marked
User and Category must already exist


***Register user***

POST /api/register

Request body format:

{ 
    "username": string
    "password": string
}

***Login user***

POST /api/login

Request body format:

{ 
    "username": string
    "password": string
}

***Create a category*** 

POST /api/categories

Request body format:

{
    "category_name": string,
    "user_id": integer
}

***Create a habit***

POST /api/habits

Request body format:
{
    "user_id": integer
    "category_id": integer
    "habit_text": string
}

***Get categories by user***

GET /api/categories/users/:id

where :id is user_id

***Get habits by user***

GET /api/habits/users/:id

where :id is user_id

***Delete a category***

DELETE /api/categories/:id

where :id is category_id

***Delete a habit***

DELETE /api/habits/:id

where :id is habit_id

***FOR TESTING ONLY:***

GET all habits

/api/habits

GET all categories

/api/categories