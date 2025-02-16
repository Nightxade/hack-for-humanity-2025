FROM node:slim

RUN mkdir -p /app
WORKDIR /app

ARG root_files="src data package.json package-lock.json"
ARG port=3000

COPY ./src ./src/
COPY package*.json ./

RUN useradd -m -r user && \
    chown -R user:user /app
USER user

RUN npm install
EXPOSE ${port}

CMD ["node", "/app/src/server.js"]