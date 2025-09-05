

errhandling
end points

Batch added

curl --location 'http://localhost:3000/medicines/batch' \
--header 'Content-Type: application/json' \
--data '{
    "medicineId": "MED123",
    "batchId": "BATCH001",
    "expiryDate": "2025-12-31",
    "quantity": 100
  }'

Stock

  curl --location 'http://localhost:3000/medicines/MED123/stock'


Sell

  curl --location 'http://localhost:3000/medicines/MED123/sell' \
--header 'Content-Type: application/json' \
--data '{
    "quantity": 20
  }'