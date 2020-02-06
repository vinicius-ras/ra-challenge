FROM node:12.14.1-alpine
ENV NODE_ENV production
WORKDIR /workspace/webapp
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]