FROM node:slim

WORKDIR /api
COPY . /api/
RUN npm install -qy
EXPOSE 3000

CMD ["npm", "start"]
