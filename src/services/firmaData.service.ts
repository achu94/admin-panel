// External Dependencies

import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

// Global Variables

export const collections: { FirmaDaten?: mongoDB.Collection } = {};

// Initialize Connection

export async function connectToDatebase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient( process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    get_scheme(db);

    const firmaDataCollection: mongoDB.Collection = db.collection("FirmaDaten");

    collections.FirmaDaten = firmaDataCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${firmaDataCollection.collectionName}`);
}

const get_scheme = async (db: mongoDB.Db) => {
    await db.command({
        "collMod": "FirmaDaten",
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["name"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string"
                    },
                    street: {
                        bsonType: "string",
                        description: "'street' is not required"
                    },
                    city: {
                        bsonType: "string",
                        description: "'city' is not required"
                    },
                    state: {
                        bsonType: "string",
                        description: "'state' is not required"
                    },
                    postalCode: {
                        bsonType: "number",
                        description: "'postalCode' is not required"
                    },
                    country: {
                        bsonType: "string",
                        description: "'country' is not required"
                    },
                    telefon: {
                        bsonType: "number",
                        description: "'telefon' is not required"
                    },
                    eMail: {
                        bsonType: "string",
                        description: "'eMail' is not required"
                    },
                    umsatzsteuerId: {
                        bsonType: "string",
                        description: "'umsatzsteuerId' is not required"
                    },
                    id: {
                        bsonType: "number",
                        description: "'id' is not required"
                    }
                }
            }
         }
    });
}