## API URL : [melancong-be.vercel.app](https://melancong-be.vercel.app/)
## API Endpoints
|             Endpoint          | Method |                                      Body                                      |                     Description                   | JWT Token |
| :---------------------------: | :----: | :----------------------------------------------------------------------------: | :-----------------------------------------------: | :-------: |
|   /                           |   GET  |                                   -                                            | Accessing our root endpoints                      |  &#9744;  |
|   /auth/register              |  POST  |                           email, password, name                                | Register account for new user                     |  &#9744;  |
|   /auth/login                 |  POST  |                             email, password                                    | Login to access the feature in application        |  &#9744;  |
|   /auth/forgot-password       |  POST  |                                email                                           | Send Forgot Password email for user               |  &#9744;  |
|   /auth/logout                |   GET  |                                   -                                            | Logout for user                                   |  &#9745;  |
|   /users                      |   GET  |                                   -                                            | Show all users                                    |  &#9745;  |
|   /users/profile              |   GET  |                                   -                                            | Show the detail data from user                    |  &#9745;  |
|   /users/update               |   PUT  |`Anything you want to edit from:` name, gender, phone                           | Edit profile from user                            |  &#9745;  |
|   /users/delete               | DELETE |                                   -                                            | Delete profile from user                          |  &#9745;  |
|   /users/upload-image         |  POST  |                                image                                           | Upload profile image from user                    |  &#9745;  |
|   /destinations               |   GET  |                                   -                                            | Show all destinations                             |  &#9745;  |
|/destinations/detail/`{dataId}`|   GET  |                                   -                                            | Show the detail destinations                      |  &#9745;  |
|   /destinations/saved         |   GET  |                                   -                                            | Show all saved destinations                       |  &#9745;  |
|   /destinations/add           |  POST  |                                  id                                            | Add destination to saved                          |  &#9745;  |
|   /destinations/delete        | DELETE |                                  id                                            | Delete saved destination                          |  &#9745;  |
|   /ai/chatbot                 |  POST  |                                prompt                                          | Ask travel tips/question for chatbot              |  &#9745;  |
