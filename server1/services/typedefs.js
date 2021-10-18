import { gql } from "apollo-server-express";

const typeDefs = gql`
type Query {
    testHola(userName:String!):Hola,
    test2:Hola,
    getBackToTheServer(data:String):Hola
}
type Subscription {
    subTest(userName: String!):Hola,
}
type Hola{
  result:String,
}
`;
/*  */

/* type Mutation{

 */
export {
    typeDefs
}
