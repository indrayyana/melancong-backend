## API URL : [melancong-be.vercel.app](https://melancong-be.vercel.app/)
## API Endpoints
|             Endpoint        | Method |                                                      Body                        |                     Description                   | JWT Token |
| :-------------------------: | :----: | :------------------------------------------------------------------------------: | :-----------------------------------------------: | :-------: |  
|   /                         |   GET  |                                   -                                              | Accessing our root endpoints                      |  &#9744;  |
|   /auth/register            |  POST  |                           email, password, name                                  | Register account for new user                     |  &#9744;  |
|   /auth/login               |  POST  |                             email, password                                      | Login to access the feature in application        |  &#9744;  |
|   /auth/password            |   GET  |                                    -                                             | Send Forgot Password email for user               |  &#9745;  |
|   /auth/logout              |   GET  |                                    -                                             | Logout for user                                   |  &#9745;  |
|   /user/profile             |   GET  |                                   -                                              | Show the detail data from user                    |  &#9745;  |
|   /user/update              |   PUT  |`Anything you want to edit from:` name, gender                                    | Edit profile from user                            |  &#9745;  | 
|   /user/delete              | DELETE |                                   -                                              | Delete profile from user                          |  &#9745;  |
