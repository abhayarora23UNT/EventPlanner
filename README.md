
###  Event Planner App

This application demonstrates how to create event planner using Angular and GraphQL. Application has the feature to perform crud operations on Event Names.



#### Prerequisites
* [NodeJs](https://nodejs.org/en/download/)
* [VsCode](https://code.visualstudio.com/)

#### Built With

* [MySql](https://www.mysql.com/)
* [Angular](https://angular.io/)
* [GraphQL](https://graphql.org/)
* [Apollo-Angular](https://www.apollographql.com/)
* HTML, CSS, Javascript

#### Configure/Installation

```
 In Client App , inside graphql.module.ts file , change value of uri to your own graphql server. 
 For example , in below code snippet
 
 const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
 export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

#### For Server App

* npm init -y
* npm i express graphql express-graphql cors 
* node index.js   // To start graphQL Server

#### For Client App

* ng add apollo-angular   // download stable version of apollo , as per your angular version

For schema details , refer the code in diretcory.
```

#### UI Screens

* Screen 1 

![image](https://github.com/abhayarora23UNT/EventPlanner/assets/98612141/ea5c0f93-b87c-4bd3-8f33-69d29d8f694c)

* Screen 2

![image](https://github.com/abhayarora23UNT/EventPlanner/assets/98612141/824b23a8-7e88-4027-b06a-245f30c50f49)

* Screen 3

![image](https://github.com/abhayarora23UNT/EventPlanner/assets/98612141/e7213a19-e2bb-4b42-9cfd-fadb370ade59)

#### Graph QL Server

* Query

![image](https://github.com/abhayarora23UNT/EventPlanner/assets/98612141/52c059b4-0581-4034-aeac-9d3f89c6e134)

* Mutation

![image](https://github.com/abhayarora23UNT/EventPlanner/assets/98612141/7e9301c3-a3f6-4107-ae11-93e678e07746)








#### Privacy Policy


See the [Privacy Policy](Privacy%20Policy.md).md file for details
