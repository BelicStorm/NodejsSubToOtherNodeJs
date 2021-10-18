import express from "express"
import {request, client} from "./client";
import gql from "graphql-tag"
import fs from "fs"

/* consts */
const testquery =  `
    query testHola($userName:String!){
      testHola(userName:$userName){
            result
        },
    }

`
const testquery2 =  `
    query {
        test2{
            result
        },
    }

`
const getBackToTheServer =  `
    query getBackToTheServer($data:String){
      getBackToTheServer(data:$data){
            result
        }
    }

`
const subTest = gql`
subscription subTest($userName:String!){
  subTest(userName:$userName){
    result
  }
}

`
const testRouter = express.Router();
const fileRoute = "/home/cristian/Escritorio/mis cosas/test.xlsx"


/* File getter and parser */
const getFile = async () => {
    fs.readFile(fileRoute, "base64", function read(err, data) {
        if (err) {
            console.log(err);
            return ""
        }
        const content = data;

        // Invoke the next step here however you like
        request.post({query:getBackToTheServer, variables:{data:content}});   // Or put the next step in a function and invoke it
    });

}

/* Subscriptions */
function subscribe(){
  // call the "subscribe" method on Apollo Client
  client.subscribe({
    query: subTest,
    variables: { userName: "test" },
  }).subscribe({
    next({data}) {
      try {
        console.log("The sub filtered for the name test results with:"+ JSON.stringify(data) 
                    + "and triggered the upload of a file");
        data.subTest ? getFile(data.subTest.result) : console.log(data)
      } catch (error) {
        console.log(error);
      }
    },
    error(err) { console.error('err', err); },
  });
}
function subscribe2(){
  // call the "subscribe" method on Apollo Client
  client.subscribe({
    query: subTest,
    variables: { userName: "test2" },
  }).subscribe({
    next({data}) {
      try {
        console.log("The sub filtered for the name test2 results with:"+ JSON.stringify(data) );
      } catch (error) {
        console.log(error);
      }
    },
    error(err) { console.error('err', err); },
  });
}
subscribe2()
subscribe()

/* Rest Api */
testRouter.get("/hola2", async (req, res) => {
    try {

      let result = await request.post({query:testquery2,})
      res.status(200).send(result);
    } catch(e) {
      console.log(e);
      res.status(500).send("no");
    }
});
testRouter.get("/hola", async (req, res) => {
  try {

    let result = await request.post({query:testquery,variables:{userName:req.body.name}})
    res.status(200).send(result);
  } catch(e) {
    console.log(e);
    res.status(500).send("no");
  }
});


export default testRouter
