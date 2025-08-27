
sample project
end points

curl --location 'http://localhost:3000/medicines/batch' \
--header 'Content-Type: application/json' \
--data '{"medicineId": "med-002", "batchId": "batch-A", "expiryDate": "2025-12-31T00:00:00Z", "quantity": 100}'

curl --location 'http://localhost:3000/medicines/med-001/stock'


curl --location 'http://localhost:3000/medicines/med-001/sell' \
--header 'Content-Type: application/json' \
--data '{"quantity": 25}'