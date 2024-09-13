FROM harbor.corp.tele2.ru/library/node:16 as Build
ARG app
WORKDIR /app
COPY ./ .
RUN npm config set strict-ssl false
RUN npm install
RUN npm run build -- --env app=$app
FROM harbor.corp.tele2.ru/library/nginx
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
EXPOSE 443
COPY --from=build /app/build .
CMD ["nginx", "-g", "daemon off;"]