<div align="center">
  <h1>🧾 NAARI FABS - Professional GST Billing App</h1>
  <p><strong>Complete Full-Stack Mobile GST Billing Solution for Textile Businesses</strong></p>

  ![Version](https://img.shields.io/badge/version-3.1-brightgreen)
  ![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-green)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
  ![License](https://img.shields.io/badge/license-MIT-purple)
  ![Platform](https://img.shields.io/badge/platform-Android-brightgreen)

  <img src="https://via.placeholder.com/800x400/6200EE/FFFFFF?text=NAARI+FABS+GST+Billing+App" alt="NAARI FABS App Banner" width="100%">

  <p>A comprehensive mobile application designed for GST-compliant invoicing with automated PDF generation, WhatsApp sharing, and secure cloud integration.</p>

  <img src="https://via.placeholder.com/800x400/25D366/FFFFFF?text=Live+Demo+Coming+Soon" alt="App Demo" width="100%">
</div>

---

## 📱 About NAARI FABS
**NAARI FABS** is a premium textile brand specializing in handloom and designer collections. This app digitalizes their billing process for speed and professionalism.

> *"House of Designer Collections for every occasion"*

---

## 🚀 Features
- ✅ Customer Management & Manual Invoice Numbering
- ✅ GST-Compliant PDF Invoices & HSN Code Database
- ✅ WhatsApp Integration & Offline Support
- ✅ Dynamic GST Calculations & Duplicate Prevention

---

## 🏗 Architecture
```mermaid
graph TD
  App[React Native App] --> API[Node.js Backend]
  API --> DB[(MongoDB Atlas)]
  API --> PDF[PDF Generator]
  PDF --> WA[WhatsApp API]
```

---

## 📊 System Flow
```mermaid
sequenceDiagram
User->>App: Add Invoice Details
App->>API: POST /api/invoices
API->>DB: Save Invoice
API->>App: Send URL
App->>WA: Share Invoice Link
```

---

## 🗄 Database Schema
```mermaid
erDiagram
Customer ||--o{ Invoice : has many
Invoice ||--o{ InvoiceItem : contains
```

---

## 🛠 Tech Stack
**Frontend**: React Native
**Backend**: Node.js, Express
**Database**: MongoDB Atlas
**Tools**: PDFKit, Render, Android Studio

---

## 📱 Screenshots
<div align="center">
<table>
<tr>
<td><img src="https://via.placeholder.com/300x500/6200EE/FFFFFF?text=Customer+Management" width="250"><br><strong>Customer Management</strong></td>
<td><img src="https://via.placeholder.com/300x500/25D366/FFFFFF?text=Invoice+Generation" width="250"><br><strong>Invoice Generation</strong></td>
<td><img src="https://via.placeholder.com/300x500/FF6B6B/FFFFFF?text=PDF+Output" width="250"><br><strong>PDF Output</strong></td>
</tr>
</table>
</div>

---

## ⚡ Quick Start
```bash
git clone https://github.com/kushagrakartikeye/Tax-Invoice-generator.git
cd Tax-Invoice-generator
npm install
npm start
npm run android
```
Add `.env`:
```
MONGODB_URI=your_mongodb_uri
PORT=3001
```

---

## 📋 API Endpoints
- POST /api/invoices
- GET /api/customers/:date

---

## 🎯 Roadmap
✔ Multi-language | Inventory | Analytics
✔ iOS Support | Multi-store Management

---

## 📞 Contact
📱 +91-9891388165 | 📧 naarionlinesale@gmail.com
**Developer**: [Kushagra Kartikeye](https://github.com/kushagrakartikeye)

---

<div align="center">
⭐ Star this repo if you found it helpful!
<br>
<img src="https://img.shields.io/github/stars/kushagrakartikeye/Tax-Invoice-generator?style=social"> <img src="https://img.shields.io/github/forks/kushagrakartikeye/Tax-Invoice-generator?style=social">
</div>
