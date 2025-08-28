# Receipt Verification Service

Microservice to verify the authenticity of receipts using SHA256 hashing.

## Features
- Digital signature (SHA256)
- Tamper check
- Verification API

## API

### `POST /verify/:receiptId`

```json
Request Body:
{
  "data": "original receipt data"
}


