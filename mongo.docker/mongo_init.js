require('dotenv').config();


// db.createUser(
//     {
//         user: "${process.env.MONGO_ROOT_USERNAME}",
//         pwd: "${process.env.MONGO_ROOT_PASSWORD}",
//         roles: [
//             {
//                 role: "readWrite",
//                 db: "${process.env.MONGO_DATABASE_NAME}"
//             }
//         ]
//     }
// );
db.auth('backend_admin', 'password');
console.log('AUTHENTICATED -------------------------------------------');
console.log(db);
db = db.getSiblingDB('ecommerce');
db.createCollection('TestDBConnectionDocuments'),
    db.getCollection('TestDBConnectionDocuments'),

    console.log('GET SIBLING -------------------------------------------');
console.log(db);
db.createUser(
    {
        user: "backend_admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "ecommerce"
            }
        ]
    }
);