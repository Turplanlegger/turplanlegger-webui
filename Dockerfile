
FROM node:current-alpine as builder

WORKDIR /turplanlegger-webui

COPY public/ /turplanlegger-webui/public
COPY src/ /turplanlegger-webui/src
COPY ["package.json", "vite.config.ts", "tsconfig.json", "tsconfig.node.json", "index.html", ".prettierrc",".eslintrc.json", "/turplanlegger-webui/"]

RUN npm i && npm run build

FROM nginx:mainline-alpine-slim

COPY --from=builder /turplanlegger-webui/build /usr/share/nginx/html

RUN cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }
}
EOF
