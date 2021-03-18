db.createUser(
    {
        user: "backend_admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "mean-ecommerce"
            }
        ]
    }
);