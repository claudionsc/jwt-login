#!/bin/bash

# Baixa a imagem
docker pull mongo

# Remove o container, se existir
docker stop node-mongoose-jwt
docker container rm node-mongoose-jwt

# Gera o container
docker run --name node-mongoose-jwt -p 27017:27017 -d mongo
