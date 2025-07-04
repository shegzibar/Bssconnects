# Use the official Nginx image as the base image
# FROM nginx:alpine
FROM nginx:latest

# Create the /tank directory and copy the content of the current directory to /usr/share/nginx/html/tank in the container
# RUN mkdir -p /usr/share/nginx/html
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Set a label for the image
# LABEL maintainer="Rikaz Group <info@keptets.com>"
# LABEL description="Keptes Cloud Implementation solution"