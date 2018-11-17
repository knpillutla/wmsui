FROM nginx
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY dist/reactive-ui-app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
