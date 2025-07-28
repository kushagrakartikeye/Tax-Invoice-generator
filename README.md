# 🧾 NAARI FABS - Professional GST Billing App

**Complete Full-Stack Mobile GST Billing Solution for Textile Businesses**

![Version](https://img.shields.io/badge/version-3.1-brightgreen)
![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Android-brightgreen)

---

## 📱 About NAARI FABS
**NAARI FABS** is a designer textile brand specializing in premium handloom and designer collections. This app digitizes their billing process, making invoice management efficient and professional.

> *"House of ladies' Designer Collections - Unique designer collections for every occasion"*

---

## 🚀 Features

### **Business Management**
- ✅ Customer Management (Date-wise)
- ✅ GST-compliant Professional Invoice Generation
- ✅ Manual Invoice Numbering
- ✅ Duplicate Prevention
- ✅ Item-wise Discounts
- ✅ Dynamic GST Rates (5%, 12%, 18%)

### **Invoice Features**
- ✅ High-quality Branded PDF Invoices
- ✅ Full HSN Code Database
- ✅ Auto Tax & Discount Calculation
- ✅ Company Branding & Terms

### **Digital Integration**
- ✅ WhatsApp Integration
- ✅ Cloud Database (MongoDB Atlas)
- ✅ Offline Access
- ✅ Mobile-First UI

---

## 🛠️ Tech Stack
- **Frontend**: React Native, React Native Paper
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Tools**: PDFKit, Render, Android Studio

---

## ⚡ Quick Start
```bash
git clone https://github.com/kushagrakartikeye/Tax-Invoice-generator.git
cd Tax-Invoice-generator
npm install
npm start
npm run android
```

Create `.env` file in backend:
```
MONGODB_URI=your_mongodb_uri
PORT=3001
NODE_ENV=production
```

---

## 📋 API Endpoints
- `GET /api/customers/:year/:month/:day`
- `POST /api/customers`
- `POST /api/invoices`
- `GET /invoices/:filename`

**Sample Invoice JSON:**
```json
{
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "invoiceNumber": "INV-001",
  "items": [{"productName": "Cotton Saree","hsn": "520811","quantity": 2,"unitPrice": 1500,"discountPercent": 10,"taxable": 2700}],
  "subtotal": 2700,
  "gstPercent": 5,
  "gst": 135,
  "total": 2835
}
```

---

## 🎯 Roadmap
- **Q3 2025**: Multi-language, Inventory Management
- **Q4 2025**: iOS Support, Analytics Dashboard
- **Q1 2026**: Multi-store, Advanced Reporting

---

## 📞 Contact
**NAARI FABS**  
📱 +91-9891388165  
📧 naarionlinesale@gmail.com  
🌐 [Website](www.naarifabs.company.site)

**Developer**  
👨‍💻 Kushagra Kartikeye  
🐙 [GitHub](https://github.com/kushagrakartikeye)

---

## 📄 License
MIT License - See [LICENSE](LICENSE).

---

⭐ **Star this repo if you found it helpful!**
