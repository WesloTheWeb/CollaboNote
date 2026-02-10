FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Switch to root to install packages
USER root

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    curl \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Supabase CLI
RUN curl -fsSL https://supabase.com/install.sh | sh

# Switch back to node user
USER node