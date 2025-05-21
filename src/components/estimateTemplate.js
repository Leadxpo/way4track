import React, { useState } from "react";
import { View, Button, Alert, Platform } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import FileViewer from "react-native-file-viewer";

const GenerateEstimatePDF = async ({ data, fileObject }) => {
  const [pdfPath, setPdfPath] = useState(null);
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .company-container { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          .company-logo { width: 80px; height: 80px; }
          .company-details { text-align: left; flex: 1; margin-left: 15px; }
          .company-details p { margin: 3px 0; font-size: 12px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .table, .table th, .table td { border: 1px solid black; }
          .table th, .table td { padding: 10px; text-align: left; }
          .total { margin-top: 20px; font-size: 16px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">Quotation</div>
         <div class="company-container">
          <!-- Logo -->
          <img src="../utilities/images/logo.png" class="company-logo" />
          
          <!-- Company Details -->
          <div class="company-details">
            <p><strong>SHARON TELEMATICS PRIVATE LIMITED</strong></p>
            <p>Company ID: U74999AP2018PTC108597</p>
            <p>21-27 Viman Nagar, Near Airport Road</p>
            <p>Visakhapatnam, Andhra Pradesh, 530009, India</p>
            <p>GSTIN: 37ABACS4415R1ZV</p>
          </div>
        </div>
        <p><strong>Client: </strong>${data.clientName}</p>
        <p><strong>Estimate #: </strong>${data.email}</p>
        <p><strong>Estimate #: </strong>${data.clientAddress}</p>
        <p><strong>Estimate Date: </strong>${data.estimateDate}</p>
        <table class="table">
          <tr>
            <th>#</th>
            <th>Item & Description</th>
            <th>HSN/SAC</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
          ${data.products
      .map(
        (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.description}</td>
              <td>${item.hsn}</td>
              <td>${item.quantity}</td>
              <td>${item.rate}</td>
              <td>${item.amount}</td>
            </tr>
          `
      )
      .join("")}
        </table>
        <div>
          <p>Description : </p>
          <p>${data.term}</p>
        </div>
        <div class="total">Total Amount: ₹${data.totalAmount}</div>
      </body>
    </html>
  `;

  let options = {
    html: htmlContent,
    fileName: `Quotation_${data.estimateNumber}`,
    directory: "Documents",
  };

  try {
    const file = await RNHTMLtoPDF.convert(options);
    Alert.alert("PDF Generated!", file.filePath);
    setPdfPath(pdf.filePath);

    const fileData = await RNFS.readFile(pdfFilePath, 'base64');
    const fileUri = `file://${pdfFilePath}`;
    const fileName = `appointment_${new Date().getTime()}.pdf`; // Unique name

    fileObject = {
      uri: fileUri,
      name: fileName,
      type: 'application/pdf',
    }
    // Open the PDF using FileViewer
    setTimeout(() => {
      FileViewer.open(file.filePath)
        .then(() => {
          console.log("PDF opened successfully");
        })
        .catch((error) => {
          Alert.alert("Error opening PDF", error.message);
        });
    }, 1000);

  } catch (error) {
    Alert.alert("Error generating PDF", error.message);
  }
};

export default GenerateEstimatePDF;
