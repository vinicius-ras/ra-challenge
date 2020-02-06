FROM node:12.14.1-alpine
ENV NODE_ENV production
WORKDIR /workspace/webapp
RUN npm install --production --silent
EXPOSE 3000
CMD ["npm", "start"]