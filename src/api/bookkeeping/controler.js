import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'Bookkeeping'; 
const collectiionName = "Bookkeeping";

function makeQueryObject(query) {
    let result = {};
    console.log(query);
    if (query.count) {
        result.count_kids = { 
                $lte: parseInt(query.count)
        };
    }
    if (query.pos) {
        result.position = { 
                $eq: query.pos
        }
    }
    console.log(result);
    return result;
};


const bookkeepingControler = {
    get: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const bookkeeping = connection.db(dbName).collection(collectiionName);          
            const result = await bookkeeping
              .find(
                    makeQueryObject(req.query)
               )
                .toArray();           
            res.send(result); 
            client.close(); 
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    getById: (req, res) => {    
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        });
        client.connect() 
            .then(connection => {
                const books = connection.db(dbName).collection(collectiionName); 
                books.findOne({
                    _id: ObjectID(req.params.id)
                })
                    .then(result => {
                        client.close();
                        if (result)
                        res.send(result);
                    else
                        res.status(404).send("Not Found");
                    })
                    .catch(error => {
                        throw error;
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    delete: (req, res) => {  
        function logError(error){ 
            console.log(error);
            res.status(500).send(error);
        }   
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        });
        client.connect(
            (error, connection) => {
                if (error) {
                    logError(error);
                } else {
                    const books = connection.db(dbName).collection(collectiionName);  
                    books.findOneAndDelete({
                        _id: ObjectID(req.params.id)
                    },
                        (error, result) => {
                            if (error) {
                                logError(error);
                            } else {
                                    connection.close();
                                    res.send(result);
                            }
                        }
                    );
                }
            }
        );
    }, 
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            if(Array.isArray(req.body))
            {
                const result = await books.insertMany(req.body);
            }
            else
            {
               const result = await books.insertOne(req.body);
            }
            res.send("Успішно добавлено!");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },  
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOneAndUpdate({
                    _id: ObjectID(req.params.id)
                },
                {
                    $set: req.body
                }, );

            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}
export default bookkeepingControler;