import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import axios from "axios";

const GenerateProductReports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/approvals");
      const approvals = response.data;
      console.log(approvals)

      // Filter approvals by date range and approved status
      const filteredApprovals = approvals.filter((approval) => {
        const approvalDate = new Date(approval.date); // Parse ISO date string
        return (
          approvalDate >= new Date(startDate) &&
          approvalDate <= new Date(endDate)
           && approval.approvalStatus === "Approved"
        );
      });

      if (filteredApprovals.length === 0) {
        toast.error("No approved requests found in the selected date range.");
        setReportData(null);
        return;
      }

      // Aggregate product requests
      const productRequests = filteredApprovals.reduce((acc, approval) => {
        acc[approval.productName] =
          (acc[approval.productName] || 0) + approval.quantity;
        return acc;
      }, {});

      // Prepare data for the report
      const totalRequests = filteredApprovals.length;
      const topProducts = Object.entries(productRequests)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity);

      setReportData({ totalRequests, topProducts });
      toast.success("Report generated successfully.");
    } catch (error) {
      console.error("Error fetching approvals:", error);
      toast.error("Failed to generate the report.");
    }
  };

  const handleDownloadPDF = () => {
    if (!reportData) {
      toast.error("Generate the report first!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Product Request Report", 10, 10);
    doc.text(`Start Date: ${startDate}`, 10, 20);
    doc.text(`End Date: ${endDate}`, 10, 30);
    doc.text(`Total Requests: ${reportData.totalRequests}`, 10, 40);
    doc.text("Top Requested Products:", 10, 50);

    reportData.topProducts.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.name} - ${product.quantity} requests`,
        10,
        60 + index * 10
      );
    });

    doc.save("ProductRequestReport.pdf");
  };

  return (
    <div className="main-content" style={{ padding: "20px" }}>
      <header>
        <h1 style={{ marginBottom: "20px" }}>Generate Product Request Report</h1>
      </header>

      <div
        className="search-box"
        style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <button
          className="edit-btn"
          onClick={handleGenerateReport}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </div>

      {reportData && (
        <div
          className="report-container"
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Report Summary</h2>
          <p>Total Requests: {reportData.totalRequests}</p>
          <h3 style={{ marginTop: "20px" }}>Top Products</h3>
          <ul>
            {reportData.topProducts.map((product, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {product.name} - {product.quantity} requests
              </li>
            ))}
          </ul>

          <button
            className="edit-btn"
            onClick={handleDownloadPDF}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateProductReports;
