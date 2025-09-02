import { generatePDF } from "../services/pdfService.js";

export async function generateReceipt(req, res, next) {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    const result = await generatePDF({ data });
    res.json({
      message: "Receipt generated successfully",
      file: `/receipts/${result.filename}`
    });
  } catch (err) {
    console.error("Error generating receipt:", err);
    res.status(500).json({ error: "Failed to generate receipt" });
  }
}
