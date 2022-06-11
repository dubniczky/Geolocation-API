FROM node:18

# Expose api port
EXPOSE 8080/tcp

# Move source
WORKDIR /app
COPY . .

# Install dependencies
RUN make deploy

# Create databundle
RUN make prep

# On start
ENTRYPOINT [ "make" ]
CMD [ "start" ]
