db.createUser(
    {
        user: $MONGO_ROOT_USERNAME,
        pwd: $MONGO_ROOT_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: $MONGO_DATABASE_NAME
            }
        ]
    }
);