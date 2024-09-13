FROM harbor.corp.tele2.ru/library/node:16 as Build
WORKDIR /app
COPY package.json ./package.json
RUN npm cache clean --force
RUN npm set registry https://crm-nexus:8444/repository/npm-proxy/
RUN npm config set strict-ssl false
RUN npm install  --legacy-peer-deps
COPY . .
RUN npm run build-ci -- -onebuild

FROM harbor.corp.tele2.ru/library/nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=Build /app/build .
COPY --from=build /app/Dockerfiles/env.sh env_dos.sh
CMD ["/bin/bash", "-c", "tr -d '\\r' < env_dos.sh > env.sh && chmod +x ./env.sh && ./env.sh && nginx -g \"daemon off;\""]