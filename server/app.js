const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

const PORT = 4000;

//connect to mongodb database
var url = "mongodb+srv://DB_USER:DB_PASS@cluster0.imglz.mongodb.net/DB_NAME?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
try {
    mongoose.connection.once('open', () => {
        console.log("Connected to Database");
    });
}
catch (err) {
    console.log(err);
} finally {
    mongoose.connection.close();
}

/*
async function run() {
    try {
        mongoose.connection.once('open', () => {
            console.log("Connected to Database");
        });
    } catch (err) {
        console.log(err.stack);
    } finally {
        await mongoose.connection.close();
    }
}
run().catch(console.dir);
*/



app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));