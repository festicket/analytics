FROM node:carbon

# Update our box and install linux dependencies
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Setup our new user and home folder
RUN groupadd -r festicket && \
    useradd -r -g festicket festicket && \
    mkdir -p /home/festicket/

# Switch to the new home folder
WORKDIR /home/festicket

# Get our node dependencies
COPY ./package.json yarn.lock ./
RUN npx yarn install

# Copy across all configs
COPY .eslintrc \
     webpack.config.js \
     ./

# Copy our application code across
COPY ./src src

# Build our assets
RUN npx yarn build

# Make sure festicket user owns: ALL OF THE THINGS
RUN chown -R festicket:festicket /home/festicket

# Make sure any process run on this box
# are run by the festicket user
USER festicket
