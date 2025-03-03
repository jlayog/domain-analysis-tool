# Set the base image to Node 20 for the Next.js app
FROM node:20-alpine AS builder

# Create a user with permissions to run the app
# -S -> create system user
# -G -> add user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host machine
# Best practice to run app as non-root user
RUN addgroup webservices && adduser -S -G webservices webservices

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
# This is done before copying the rest of the files to take advantage of Docker's caching mechanism
# If the package.json and package-lock.json files have not changed, Docker will use the cached image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

RUN npm run build

# Runtime stage
FROM node:20-alpine

# Copy app user from builder
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /app

# Copy built files from builder
COPY --from=builder --chown=webservices:webservices /app/.next ./.next
COPY --from=builder --chown=webservices:webservices /app/public ./public
COPY --from=builder --chown=webservices:webservices /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Switch to non-root user
USER webservices

EXPOSE 3000

CMD ["npm", "start"]