FROM node:20-alpine AS builder

# Create app user
RUN addgroup webservices && adduser -S -G webservices webservices

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Runtime stage
FROM node:20-alpine

# Copy app user from builder
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder --chown=webservices:webservices /app/node_modules ./node_modules
COPY --from=builder --chown=webservices:webservices /app/package*.json ./
COPY --from=builder --chown=webservices:webservices /app/ ./

# Create necessary directories and set permissions
RUN mkdir -p /home/webservices/.npm && \
    chown -R webservices:webservices /home/webservices

USER webservices

EXPOSE 3001

CMD ["npm", "start"]