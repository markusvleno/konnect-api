FROM node:16.1.0


# env
ENV NODE_ENV=production \
    PORT=8080
    


# home dir
RUN mkdir -p /home/konnect

COPY . /home/konnect

RUN touch /home/konnect/log/server.log

CMD [ "node","/home/konnect/index.js" ]