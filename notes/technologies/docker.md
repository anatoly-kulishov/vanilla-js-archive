DOCKER

Инсталл (2 варианта рабочие)

1. sudo apt update

2. sudo apt-get install \ca-certificates \curl \gnupg \lsb-release

3. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

4. echo \

  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \

  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

5. sudo apt-get update

6. sudo apt-get install docker-ce docker-ce-cli containerd.io

7.  sudo docker run hello-world  -проверить правильную установку докера

ЛИБО 

1. sudo apt update

2. sudo apt install apt-transport-https ca-certificates curl software-properties-common

3. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

4. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

5. sudo apt update

6. apt-cache policy docker-ce

7. sudo apt install docker-ce

8. sudo systemctl status docker

  Инсталл docker-compose

1. sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2. sudo chmod +x /usr/local/bin/docker-compose

3. docker-compose —version — проверить правильную установку

Основные термины:

Docker - это платформа для разработки, доставки и запуска контейнерных приложений

Images — это неизменяемый файл (образ), из которого разворачиваются контейнеры. 

Контейнер - это уже развернутое из образа и работающее приложение. Контейнеры работают изолированно от внешнего окружения.

Dockerfile(фаил в корне приложения/микросервиса) — это инструкция для сборки образа. Это простой текстовый файл, содержащий по одной команде в каждой строке. В нем указываются все программы, зависимости и образы, которые нужны для разворачивания образа.

Docker Registry — репозиторий с докер-образами (что то похожее на гитхаб, только хранит образы Ubuntu, Бд, языки программирования и т д  )

Docker—compose - инструмент для создания и запуска многоконтейнерных Docker приложений. В Compose, вы используете специальный файл для конфигурирования ваших сервисов приложения. Затем, используется одна команда, для создания и запуска всех сервисов из конфигурационного файла.

Docker volume — это просто папка хоста, примонтированная к файловой системе контейнера. Так как технически она больше не принадлежит контейнеру, то последний можно смело удалять, пересоздавать заново, снова прикручивать к нему хостовые папки, и ничего с данными внутри не случится.

Основные команды: 

sudo docker run hello-world — проверка работостопособности

docker-compose —version - проверка работостопособности docker-compose

docker images — посмотреть образы

docker ps — посмотреть контейнеры

docker ps -a — посмотреть контейнеры в том числе остановленные

docker ps -a -q — посмотреть  ID контейнеров в том числе остановленные

docker stop $(docker ps -a -q) — остановить все контейнеры

docker rm $(docker ps -a -q) — удалить все контейнеры

docker build -t first-docker-app — собрать контейнер

docker run first-docker-app — запустить контейнера

sudo docker-compose up —build — собрать сборку

sudo docker-compose up — поднять сборку (запустить)

sudo docker system prune -a -f — удалить все лишнее после контейнеров

Примеры фаилов: 

Dockerfile:

FROM alpine:latest as wkhtmltopdf_provider

RUN apk update && apk add wget && \

# Installing specific version of the wkhtmltopdf package

wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \

tar -xf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \

chmod +x wkhtmltox/bin/wkhtmltopdf && \

cp wkhtmltox/bin/wkhtmltopdf /usr/bin/wkhtmltopdf && \

rm wkhtmltox-0.12.4_linux-generic-amd64.tar.xz

FROM python:3.8.7

WORKDIR /opt/swa/

COPY --from=wkhtmltopdf_provider /usr/bin/wkhtmltopdf /usr/bin/wkhtmltopdf

RUN apt-get update \

&& apt-get install -y --no-install-recommends \

postgresql-client \

# Generate PDF files

openssl \

# wkhtmltopdf library deps

libxrender1 libfontconfig \

nano && \

# Clean-up

apt-get autoremove -y && rm -rf /var/lib/apt/lists/

COPY ./swa/requirements.txt /opt/swa/requirements.txt

RUN pip3 install --upgrade pip

RUN pip3 install --no-cache-dir -r /opt/swa/requirements.txt \

&& pip3 install --no-cache-dir tox==2.9.1

COPY ./swa/entrypoint.sh /opt/swa/entrypoint.sh

COPY ./deployment/docker/celery_worker.sh /etc/celery_worker.sh

RUN chmod +x /opt/swa/entrypoint.sh

RUN chmod +x /etc/celery_worker.sh

docker-compose.yml

# Development compose file

version: '3.1'

networks:

streamline_network:

driver: bridge

services:

database:

# Description: persistance storage

# Technology: PostgreSQL

image: postgres:10.1-alpine

restart: always

# those are creds used for the dev environment only

environment:

- POSTGRES_USER=${SWA_DATABASE_USER}

- POSTGRES_PASSWORD=${SWA_DATABASE_PASSWORD}

- POSTGRES_DB=${SWA_DATABASE_DB}

networks:

- streamline_network

ports:

- "127.0.0.1:5432:5432"

backend:

build:

context: .

dockerfile: Dockerfile.backend.dev

entrypoint: bash /opt/swa/entrypoint.sh

command: --run-dev-server

restart: unless-stopped

depends_on:

- database

- redis

- messagebus

environment:

- DJANGO_SETTINGS_MODULE=${BACKEND_SETTINGS:-swa.settings.main}

- SWA_DATABASE_NAME=${SWA_DATABASE_DB}

- SWA_DATABASE_USER=${SWA_DATABASE_USER}

- SWA_DATABASE_HOST=database

- "127.0.0.1:8000:8000"

volumes:

# Mount the back-end code to the container

- ./swa:/opt/swa

working_dir: /opt/swa

networks:

- streamline_network

redis:

# Caching

image: redis:3.0.7-alpine

ports:

- "127.0.0.1:6379:6379"

networks:

- streamline_network

messagebus:

image: rabbitmq:3.7.3-management-alpine

# We're not interested in rabbitmq logs

logging:

driver: none

ports:

- "127.0.0.1:5672:5672"

- "127.0.0.1:15672:15672"

networks:

- streamline_network
