#!/bin/bash
echo "Démarrage MariaDB..."
sudo systemctl start mariadb

echo "Démarrage Backend..."
cd ~/Bureau/Moratazana/banckend
./mvnw spring-boot:run &

echo "Attente du backend..."
sleep 10

echo "Démarrage Frontend..."
cd ~/Bureau/Moratazana/frontent
pnpm run dev
