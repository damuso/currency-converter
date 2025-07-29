#!/bin/bash

echo "Setting up Currency Converter Project..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created successfully!"
    echo "Please edit the .env file to configure your environment variables and run the setup again."
    exit 1
else
    echo "⚠️ .env file already exists. Skipping creation."
fi

echo "Installing dependencies..."
pnpm install

echo "Starting PostgreSQL database..."
docker-compose up -d
echo "Waiting for database to be ready..."
sleep 10

echo "Running database migrations..."
pnpm run db:deploy

echo "Seeding the database..."
pnpm run db:seed

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start all applications: pnpm run start"
echo "2. Seed the database current fresh exchange rates by visiting http://localhost:5000/trpc/exchangeRate.updateExchangeRates"
echo "3. Open http://localhost:3000 in your browser"
