# Subscription & Billing Service

## Purpose
This service helps manage user plans, limits, and payments. For example, if a customer is using 1,000 QR codes per day, this service checks if it's within their plan and generates a bill if they cross the limit.

## Technology Used (Tech Stack)
- **Node.js**: The coding language used to build the service.
- **Stripe / Razorpay**: Online payment tools to handle transactions.

## Communication
- **REST APIs**: Used to talk with other parts of the system (like asking for user limits or payment info).
- **Webhooks**: Used to receive updates from Stripe or Razorpay when someone makes a payment.

## Security
- **PCI-DSS Compliance**: This is a standard to keep payment information safe.
- **Audit Logs**: It keeps records of every activity for tracking and safety.

## Key Features
- **QR Usage Meter**: Tracks how many QR codes a customer uses.
- **Overage Alerts**: Sends alerts if they use more than their allowed limit.
- **Invoice & Payment Status APIs**: Lets other systems check the invoice and payment status.
- **Webhooks for Payment Confirmation**: Gets automatic updates when a user pays the bill.