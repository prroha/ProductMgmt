# Use a specific version of the node image
FROM node:14-alpine

CMD [ "npm", "run", "prettier:fix" ]
# Create a non-root user
RUN addgroup -S projectuser && adduser -S -G projectuser projectuser

# Set the working directory
WORKDIR /home/node/app

# Copy only the package files first
# This step will be cached if the package files don't change
COPY package*.json ./

# Install dependencies
# This step will be cached if package files haven't changed
RUN npm install --prefix /home/node/app

# Install sqlite3
# This step will be cached if package files haven't changed
RUN npm install sqlite3 --prefix /home/node/app

# Copy the rest of the application files, excluding node_modules
# This step will only be executed if files other than package files change
COPY --chown=projectuser:projectuser . .

# Set permissions for the data directory
# This step will only be executed if files other than package files change
RUN chown -R projectuser:projectuser /home/node/app/data
RUN chmod 755 /home/node/app/data/product_mgmt_sqlite

# Expose the required port
EXPOSE 5000

# Switch to the non-root user
USER projectuser

# Start the application
CMD [ "npm", "start" ]

