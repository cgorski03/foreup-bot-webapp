# Tee Time Finder Web App

Welcome to my Tee Time Finder Web App repository! This web app simplifies the process of securing sought-after tee times at popular golf courses. Whether you're a golf enthusiast or a casual player, this platform aims to provide you with an intuitive and efficient experience for discovering and booking tee times. This is just the front end of the application.

## Features

- **User Authentication:** Secure user authentication powered by AWS Cognito ensures a safe and personalized experience.

- **Course Selection:** Utilize the search functionality to discover and select your favorite golf course.

- **Search Criteria:** Input criteria about when you want to play - a date, time range, and amount of players. Do or don't be specific!

- **Start your search:** Start your search! Make sure you have verified a contact method in settings and you will be contacted when a time opens up that fits your criteria.

- **Track your searches:** Go to the dashboard page to check the status of current searches and cancel ones you no longer need to be notified about.

## Technologies Used

- **React:** The frontend is developed using the React framework. This enables a smooth and responsive UI.

- **AWS Cognito:** Ensures secure and scalable user authentication.

- **AWS API Gateway:** An API gateway secured with lambda authorizers connected to Cognito connects the front and back end of the application. 

- **CloudWatch Rules and Lambda:** Orchestrates tee time searches, ensuring seamless execution and reliability.

- **DynamoDB:** DynamoDB is used for robust and efficient tracking of user searches.

## License

This project is licensed under the [MIT License](LICENSE.md).
