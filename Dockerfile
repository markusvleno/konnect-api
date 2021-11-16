FROM node:16.1.0


# env
ENV NODE_ENV=production \
    PORT=8080
    


# home dir
RUN mkdir -p /home/konnect

COPY . /home/konnect

RUN mkdir -p /home/konnect/log
RUN touch /home/konnect/log/server.log

EXPOSE 8080

CMD [ "node","/home/konnect/index.js" ]