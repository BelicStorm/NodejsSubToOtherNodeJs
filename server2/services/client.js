import axios from 'axios';
import {
  ApolloClient,
} from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory'
import ws from "ws"
import { SubscriptionClient } from 'subscriptions-transport-ws';

const wsUrl = "ws://192.168.1.237:4000/graphql"
const wsLink = new SubscriptionClient(wsUrl, {
  reconnect: true
}, ws)

const client = new ApolloClient({
  link: wsLink ,
  cache: new InMemoryCache()
});


const graphqlUri =  "http://192.168.1.237:4000/graphql"

let API = axios.create({
  baseURL: graphqlUri,
  headers: {
    'Content-Type': 'application/json'
  },
});
const request ={
  post: (body) => API.post("/",body).then(function (data) {    
      return data.data
  }).catch((e)=>{
      console.log(e)
      return e
  }),
}


export {request, client} 

