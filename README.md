# Crypto Stats API

A Node.js service that tracks cryptocurrency prices and provides statistical analysis using the CoinGecko API.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/crypto-stats
PORT=3000
COINGECKO_API_KEY=your_api_key_here
```
4. Build and start the server:
```bash
npm run build
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

### Get Current Stats

Retrieves the latest statistics for a specific cryptocurrency.

```
GET /stats?coin={coinId}
```

Parameters:
- `coin` (required): The coin ID (bitcoin, ethereum, or matic-network)

Example Response:
```json
{
  "price": 35000.50,
  "marketCap": 680000000000,
  "24hChange": 2.5
}
```

### Get Price Deviation

Calculates the standard deviation of prices over the last 100 data points.

```
GET /deviation?coin={coinId}
```

Parameters:
- `coin` (required): The coin ID (bitcoin, ethereum, or matic-network)

Example Response:
```json
{
  "deviation": 125.45
}
```

## Supported Cryptocurrencies

- Bitcoin (coin=bitcoin)
- Ethereum (coin=ethereum)
- Polygon (coin=matic-network)

## Background Jobs

The service automatically updates cryptocurrency prices every minute using a cron job.

## Error Responses

The API may return the following error responses:

- 400 Bad Request: Missing or invalid parameters
- 404 Not Found: No data available for the specified coin
- 500 Internal Server Error: Server-side error

Example Error Response:
```json
{
  "error": "Coin parameter is required"
}
```

## Development

- Run tests: `npm test`
- Run linter: `npm run lint`
- Build project: `npm run build`

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
