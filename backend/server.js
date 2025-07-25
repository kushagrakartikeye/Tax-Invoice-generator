const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/invoices', express.static('invoices'));

// MongoDB connection
mongoose.connect('mongodb+srv://kushagrakartikeye:jYGWwhGJgAsAUMGQ@dadapp.fc1frmk.mongodb.net/gst_billing_app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully!');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  year: Number,
  month: Number,
  day: Number,
  dateString: String,
  createdAt: { type: Date, default: Date.now }
});

// UPDATED: Invoice Schema with discount support
const invoiceSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  year: Number,
  month: Number,
  day: Number,
  dateString: String,
  items: [{
    productName: String,
    hsn: String,
    quantity: Number,
    unitPrice: Number,
    discountPercent: { type: Number, default: 0 }, // Added discount field
    taxable: Number
  }],
  subtotal: Number,
  gstPercent: { type: Number, default: 5 }, // Added GST percent field
  gst: Number,
  total: Number,
  invoiceImagePath: String,
  createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Create invoices directory if it doesn't exist
const invoicesDir = path.join(__dirname, 'invoices');
if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir);
}

// UPDATED: PDF generation with evenly spaced table columns
function generateInvoiceImage(invoiceData, filename) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const filePath = path.join(invoicesDir, filename);
    doc.pipe(fs.createWriteStream(filePath));

    // Header Section with Professional Layout (UNCHANGED)
    doc.fontSize(32).fillColor('#6200EE').text('NAARI FABS', 40, 40);
    doc.fontSize(14).fillColor('#000000').text("House of ladies' Designer Collections", 40, 75);
    
    // Address and bullet points (UNCHANGED)
    doc.fontSize(10).fillColor('#000000');
    doc.text('a house of designer | wedding sarees | unstitched suits | readmades | lehngas', 40, 95);
    doc.text('UTC Millinium Plaza, Shop No: LG 1', 40, 107);
    doc.text('B Block, Shalimar Garden Extension II,', 40, 119);
    doc.text('Sahibabad, Ghaziabad, Uttar Pradesh', 40, 131);
    doc.text('201005 (Near Chandrashekhar Park Main Market)', 40, 143);
    
    // Company contact details (UNCHANGED)
    doc.fontSize(12).fillColor('#666').text('GST Reg: 09ACEPS4702P1Z3 | Ph: +91-9891388165', 40, 160);
    doc.fontSize(12).fillColor('#666').text('Email: naarionlinesale@gmail.com | www.naarifabs.company.site', 40, 175);

    // Logo section (UNCHANGED)
    const logoPath = path.join(__dirname, 'nari-logo.png');
    try {
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 450, 40, {
          width: 125,
          height: 105,
          fit: [125, 105],
          align: 'center'
        });
      } else {
        doc.rect(450, 40, 100, 80).stroke('#6200EE');
        doc.fontSize(10).fillColor('#6200EE').text('LOGO NOT', 475, 65);
        doc.text('FOUND', 485, 80);
      }
    } catch (error) {
      console.error('Error loading logo:', error);
      doc.rect(450, 40, 100, 80).stroke('#6200EE');
      doc.fontSize(10).fillColor('#6200EE').text('LOGO ERROR', 475, 80);
    }

    // Invoice Title and Details (UNCHANGED)
    doc.fontSize(24).fillColor('#6200EE').text('TAX INVOICE', 40, 200);
    
    doc.rect(350, 190, 200, 70).fillAndStroke('#f8f9ff', '#6200EE');
    doc.fontSize(12).fillColor('black');
    doc.text(`Invoice #: NAARI-${Date.now().toString().slice(-6)}`, 360, 205);
    doc.text(`Date: ${invoiceData.dateString}`, 360, 225);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 360, 245);

    // Horizontal line separator (UNCHANGED)
    doc.moveTo(40, 280).lineTo(555, 280).strokeColor('#6200EE').lineWidth(2).stroke();

    // Bill To Section (UNCHANGED)
    doc.fontSize(16).fillColor('#333').text('Bill To:', 40, 300);
    doc.fontSize(14).fillColor('black').text(invoiceData.customerName, 40, 325);
    doc.text(`Phone: +91 ${invoiceData.customerPhone}`, 40, 345);

    // Payment Info (UNCHANGED)
    doc.fontSize(12).fillColor('#666').text('Payment Method: Cash/UPI/Card', 350, 325);

    // FIXED: Table Header with evenly spaced columns
    let yPosition = 380;
    doc.rect(35, yPosition - 10, 520, 30).fill('#6200EE');
    
    doc.fontSize(10).fillColor('white');
    doc.text('S.No', 50, yPosition);
    doc.text('Product Description', 85, yPosition);
    doc.text('HSN Code', 255, yPosition);
    doc.text('Qty', 320, yPosition);
    doc.text('Rate (Rs)', 360, yPosition);
    doc.text('Disc%', 420, yPosition);
    doc.text('Amount (Rs)', 460, yPosition);
    
    // FIXED: Table Items with evenly spaced columns
    yPosition += 35;
    doc.fillColor('black');
    
    invoiceData.items.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.rect(35, yPosition - 8, 520, 25).fill('#f8f9ff');
      }
      
      doc.fontSize(9).fillColor('black');
      doc.text(`${index + 1}`, 50, yPosition);
      
      const productName = item.productName.length > 18 ? 
        item.productName.substring(0, 18) + '...' : item.productName;
      doc.text(productName, 85, yPosition, { width: 160 });
      
      doc.text(item.hsn, 255, yPosition);
      doc.text(item.quantity.toString(), 320, yPosition);
      doc.text(`Rs ${item.unitPrice.toFixed(2)}`, 360, yPosition);
      doc.text(`${item.discountPercent || 0}%`, 420, yPosition);
      doc.text(`Rs ${item.taxable.toFixed(2)}`, 460, yPosition);
      
      yPosition += 25;
    });

    // Add spacing before totals (UNCHANGED)
    yPosition += 20;

    // UPDATED: Totals Section with dynamic GST percentage
    const totalsStartX = 350;
    
    // Subtotal (UNCHANGED)
    doc.fontSize(12).fillColor('black');
    doc.text('Subtotal:', totalsStartX, yPosition);
    doc.text(`Rs ${invoiceData.subtotal.toFixed(2)}`, totalsStartX + 120, yPosition);
    yPosition += 20;
    
    // GST with dynamic percentage
    const gstPercent = invoiceData.gstPercent || 5;
    doc.text(`GST (${gstPercent}%):`, totalsStartX, yPosition);
    doc.text(`Rs ${invoiceData.gst.toFixed(2)}`, totalsStartX + 120, yPosition);
    yPosition += 25;
    
    // Total (UNCHANGED)
    doc.rect(totalsStartX - 10, yPosition - 8, 220, 35).fillAndStroke('#e8f5e8', '#0c7645');
    doc.fontSize(14).fillColor('#0c7645');
    doc.text('TOTAL AMOUNT:', totalsStartX, yPosition + 5);
    doc.text(`Rs ${invoiceData.total.toFixed(2)}`, totalsStartX + 120, yPosition + 5);

    // Terms & Conditions Section (UNCHANGED)
    yPosition += 60;
    doc.fontSize(14).fillColor('#6200EE').text('Terms & Conditions:', 40, yPosition);
    doc.fontSize(10).fillColor('#333');
    yPosition += 20;
    
    const terms = [
      '• No guarantee for colour/zari/handwork/work items',
      '• Goods once sold will not be taken back without prior approval',
      '• Subject to Ghaziabad local jurisdiction only',
      '• For any queries, contact us at +91-9891388165',
      '• Goods once sold will not be returned, will exchanged within seven days'
    ];
    
    terms.forEach(term => {
      doc.text(term, 40, yPosition);
      yPosition += 15;
    });

    // Footer Section (UNCHANGED)
    yPosition += 30;
    const footerStartY = yPosition;
    
    doc.fontSize(16).fillColor('#6200EE').text('Thank you for choosing NAARI FABS!', 40, yPosition, { 
      align: 'center', 
      width: 515 
    });
    
    yPosition += 25;
    doc.fontSize(12).fillColor('#666').text('unique designer collections for every occasion', 40, yPosition, { 
      align: 'center', 
      width: 515 
    });

    // QR Code section (UNCHANGED)
    const qrLogoPath = path.join(__dirname, 'naari-fabs-logo.png');
    
    try {
      if (fs.existsSync(qrLogoPath)) {
        doc.image(qrLogoPath, 480, footerStartY - 80, {
          width: 120,
          height: 120,
          fit: [80, 80],
          align: 'center'
        });
        doc.fontSize(10).fillColor('#666').text('Scan for Location', 475, footerStartY - 60 + 85);
      } else {
        doc.rect(460, footerStartY - 60, 80, 80).stroke('#666');
        doc.fontSize(8).fillColor('#666').text('QR Code for', 480, footerStartY - 60 + 35);
        doc.text('Location', 485, footerStartY - 60 + 45);
      }
    } catch (error) {
      console.error('Error loading QR:', error);
      doc.rect(460, footerStartY - 60, 80, 80).stroke('#666');
      doc.fontSize(8).fillColor('#666').text('Location QR', 485, footerStartY - 60 + 40);
    }

    doc.end();
    doc.on('end', () => resolve(filePath));
    doc.on('error', reject);
  });
}

// API Routes (ALL UNCHANGED)

// Get customers for a specific date
app.get('/api/customers/:year/:month/:day', async (req, res) => {
  try {
    const { year, month, day } = req.params;
    const customers = await Customer.find({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day)
    }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add customer
app.post('/api/customers', async (req, res) => {
  try {
    const { name, phone, year, month, day } = req.body;
    const dateString = `${day}/${month}/${year}`;
    
    const customer = new Customer({
      name,
      phone,
      year,
      month,
      day,
      dateString
    });
    
    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete customer
app.delete('/api/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    await Invoice.deleteMany({ customerName: req.body.customerName });
    res.json({ message: 'Customer and associated invoices deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save invoice
app.post('/api/invoices', async (req, res) => {
  try {
    const invoiceData = req.body;
    const filename = `invoice_${Date.now()}.pdf`;
    
    // Generate PDF
    await generateInvoiceImage(invoiceData, filename);
    
    // Save to database
    const invoice = new Invoice({
      ...invoiceData,
      invoiceImagePath: filename
    });
    
    await invoice.save();
    res.json({ ...invoice.toObject(), invoiceUrl: `/invoices/${filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get invoices for a customer
app.get('/api/invoices/:customerName/:year/:month/:day', async (req, res) => {
  try {
    const { customerName, year, month, day } = req.params;
    const invoices = await Invoice.find({
      customerName,
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day)
    }).sort({ createdAt: -1 });
    
    const invoicesWithUrls = invoices.map(invoice => ({
      ...invoice.toObject(),
      invoiceUrl: `/invoices/${invoice.invoiceImagePath}`
    }));
    
    res.json(invoicesWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
