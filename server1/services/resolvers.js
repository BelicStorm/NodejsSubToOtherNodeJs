import { PubSub, withFilter } from 'graphql-subscriptions'
import fs from "fs"
import { Readable } from 'stream'
const pubsub = new PubSub()
const USER_EVENT = 'USER_EVENT'
const extension = "csv"
const resolvers = {
    Query:{
        async getBackToTheServer(_obj, {data}, _context, _info){
            const buffer = Buffer.from(data, 'base64')
            var s = new Readable()

            s.push(buffer)   
            s.push(null) 

            s.pipe(fs.createWriteStream("test."+extension));
            s.on("finish", async function() {
                fs.access("./test.csv", function(err) {
                    if (err) {
                        console.log(err,"/////////////");
                        reject()
                    }
                                        
                })
            })
            return {result:`ok`}
        },
        async testHola(_obj, {userName}, _context, _info){
            console.log(userName);
            pubsub.publish(USER_EVENT, { subTest: {result:userName} })
            return {result:`hola ${userName}`}
        },
        async test2(_obj, _req, _context, _info){
            console.log("test");
            return {result:`hola`}
        },
    },
    Subscription:{
        subTest: {
                subscribe: withFilter(
                    () => pubsub.asyncIterator('USER_EVENT'),
                    (payload, variables) => {

                      return (payload.subTest.result === variables.userName);
                    },
                  ),
            
        },
    } 
}


export {
    resolvers
}
