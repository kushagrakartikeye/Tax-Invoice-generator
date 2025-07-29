<div align="center">
  <h1>🧾 NAARI FABS - Professional GST Billing App</h1>
  <p><strong>Complete Full-Stack Mobile GST Billing Solution for Textile Businesses</strong></p>

  ![Version](https://img.shields.io/badge/version-3.1-yellow)
  ![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-green)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen)
  ![Typescript](https://img.shields.io/badge/Typescript-0.80.2-purple)
  ![Platform](https://img.shields.io/badge/platform-Android-brightgreen)

  <img src="![WhatsApp Image 2025-07-14 at 22 41 03_026b2eb3](https://github.com/user-attachments/assets/08d93a96-31de-44bf-b8fc-984f04b0d08a)
text=NAARI+FABS+GST+Billing+App" alt="NAARI FABS App Banner" width="100%">

  <p>A comprehensive mobile application designed for GST-compliant invoicing with automated PDF generation, WhatsApp sharing, and secure cloud integration.</p>
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

## 🛠 Tech Stack
**Frontend**: React Native  
**Backend**: Node.js, Express  
**Database**: MongoDB Atlas  
**Tools**: PDFKit, Render, Android Studio

---
## Working Demo Video
https://github.com/user-attachments/assets/e93a7c00-8056-406e-a814-ecdb8473a371

## 📱 Screenshots
<div align="center">
<table>
<tr>
<td><img src="![WhatsApp Image 2025-07-29 at 23 35 46_e6609e9b](https://github.com/user-attachments/assets/55750f13-029e-41c5-9657-ade3ea92cc49)
" width="250"><br><strong>Customer Management</strong></td>
<td><img src="![WhatsApp Image 2025-07-29 at 23 35 47_0f1ab4f5](https://github.com/user-attachments/assets/fe920cf4-64ce-4fdf-b184-330e2621fa9c)
" width="250"><br><strong>Invoice Generation</strong></td>
<td><img src="![WhatsApp Image 2025-07-29 at 23 35 47_4f853fa6](https://github.com/user-attachments/assets/be266c18-b253-4a36-b599-1683b9e12266)
"><br><strong>PDF Output</strong></td>
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

## 📞 Contact
📱 +91-9891388165 | 📧 naarionlinesale@gmail.com  
**Developer**: [Kushagra Kartikeye](https://github.com/kushagrakartikeye)

---
<div align="center">
⭐ Star this repo if you found it helpful!  
<img src="https://img.shields.io/github/stars/kushagrakartikeye/Tax-Invoice-generator?style=social"> <img src="https://img.shields.io/github/forks/kushagrakartikeye/Tax-Invoice-generator?style=social">
</div>
