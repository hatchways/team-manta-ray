##Current possible query parameters for `/api/search`

Install this extension to view the table properly: https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced

| Parameter    | Expected          | Description                                                                          | Required?                            | Default                |
| ------------ | ----------------- | ------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------- |
| cuisines=    | eg. asian,italian | Tags to use to filter chefs and recipes based on their cuisineTags                   | optional                             | empty (no tag filters) |
| chefs=       | true or false     | Whether to retrieve chefs instead of recipes                                         | optional                             | false                  |
| location=    | [lng,lat]         | Coordinates of the user making the request                                           | optional (required for ?maxdistance) | undefined              |
| maxdistance= | eg. 30            | Maximum distance in km chefs can be from the user's location (provided by ?location) | optional                             | 0 (no max distance)    |
| page=        | eg. 2             | Which page of the data should be returned                                            | optional                             | 1                      |
| limit=       | eg. 9             | Number of results per page                                                           | optional                             | 12                     |
| sortby=      | eg. "price"       | By what metric the results should be sorted                                          | optional                             | undefined (no sorting) |
| order=       | "asc" or "desc"   | What order the sorted results should appear (using ?sortby)                          | optional                             | "asc"                  |
