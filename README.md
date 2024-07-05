## API Endpoints
|             Endpoint        | Method |                                                      Body                                                     |            Description          |
| :-------------------------: | :----: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------: |
|   /                         |   GET  |                                   -                                                                           | Accessing our root endpoints    |
|   /auth/register            |  POST  |                           email, password, name                                                               | Register account for new user   |
|   /auth/login               |  POST  |                             email, password                                                                   | Login to access the feature in application|
|   /user/profile             |   GET  |                                   -                                                                           | Show the detail data from user  |
|   /user/update              |   PUT  |`Anything you want to edit from` name, gender                                                                  | Edit profile from user          |
|   /user/delete              | DELETE |                                   -                                                                           | Delete profile from user        |
