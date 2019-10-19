FROM node:lts-alpine

WORKDIR /api
ADD /api /api/
RUN npm install -qy
EXPOSE 3000

CMD ["npm", "start"]
