## API Endpoints
|             Endpoint        | Method |                                                      Body                                                     |            Description          |
| :-------------------------: | :----: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------: |
|   /                         |   GET  |                                   -                                                                           | Accessing our root endpoints    |
|   /auth/register            |  POST  |        firstName, lastName, phoneNumber, email, password, gender, weight, height, age                         | Register account for new user   |
|   /auth/login               |  POST  |                             email, password                                                                   | Login to access the feature in application|
|   /user/profile             |   GET  |                                   -                                                                           | Show the detail data from user  |
|   /user/update              |   PUT  |`Anything you want to edit from` firstName, lastName, phoneNumber, email, password, gender, weight, height, age| Edit profile from user          |
|   /user/delete              | DELETE |                                   -                                                                           | Delete profile from user        |
|   /tracker                  |   GET  |                                   -                                                                           |Show all glucose trackers from user|
|   /tracker/add              |  POST  |             glucose, condition, notes, datetime                                                               | Create new glucose tracker      |
|/tracker/delete/{{trackerId}}| DELETE |                                   -                                                                           | Delete glucose tracker from user|
|   /food                     |   GET  |            name -> `Query for search food by name`                                                            |Show all food from user or Search food|
|   /food/today               |   GET  |                                   -                                                                           |Show all today's food from users |
|/food/detail/{{foodId}}      |   GET  |                                   -                                                                           |   Show the detail food data     |
|   /food/add                 |  POST  |        foodName, gIndex, gLoad, giCategory, glCategory, carbs, calories, fats, proteins, category             |   Save food to firestore DB     |
|/food/delete/{{foodId}}      | DELETE |                                   -                                                                           |      Delete food from user      |
|   /dataset                  |   GET  |                                   -                                                                           |Show all data from dataset       |
| /dataset/detail/{{dataId}}  |   GET  |                                   -                                                                           |Show the detail data from dataset|
| /ai/recommend               |  POST  |                              foodName                                                                         |Food recommendation by Vertex AI |
### - Flask-API Endpoints :
|             Endpoint        | Method |                                                      Body                                                     |            Description          |
| :-------------------------: | :----: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------: |
| `/predict_new_data`         | POST   | foodName, category, calories, proteins, carbs, fats                                                           |  Returns new meal's GI & GL     |
