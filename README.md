# 📆 Timestamp Microservice

An Express.js API for timestamp conversion

## 🚀 Usage

### `GET /api/:date?`

- `/api` → current date
- `/api/2015-12-25` → date string
- `/api/1451001600000` → Unix timestamp
- `/api/invalid-date` → `{ error: "Invalid Date" }`

### Example Response:
```json
{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
