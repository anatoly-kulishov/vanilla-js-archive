FROM harbor.corp.tele2.ru/library/node:16 as Build
ARG app
WORKDIR /app
COPY ./ .
RUN npm config set strict-ssl false
RUN npm install && npm run build -- --env app=$app

FROM harbor.corp.tele2.ru/library/nginx
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY --from=build /app/Dockerfiles/env.sh env_dos.sh
CMD ["/bin/bash", "-c", "tr -d '\\r' < env_dos.sh > env.sh && chmod +x ./env.sh && ./env.sh && nginx -g \"daemon off;\""]