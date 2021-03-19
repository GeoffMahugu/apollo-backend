### Mongo on Docker

This documentation will contain steps in order to setup and debug your mongo docker image.

#### Access the docker image

To access the docker image run ``docker ps`` to get the ID of the running container then run the command bellow to ssh into the container:

``docker exec -it <CONTAINER_ID> bash``

#### To Authenticate a dabase using your credentials:

``mongo -u <USERNAME> -p <PASSWORD> --authenticationDatabase <DATABASE_NAME>``

in my case that would be:

``mongo -u admin -p password --authenticationDatabase mean-ecommerce``