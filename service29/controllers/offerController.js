const Offer = require('../models/Offer'); // Import model

// 🔸 POST /offer/attach — Save new offer for a receipt
exports.attachOffer = async (req, res) => {
  try {
    // Extract required fields from request body
    const { receiptId, merchantId, location, showTimeRange, bannerText, ctaLink } = req.body;

    // Create a new Offer document
    const offer = new Offer({
      receiptId,
      merchantId,
      location,
      showTimeRange,
      bannerText,
      ctaLink
    });

    // Save to database
    await offer.save();

    // Send success response
    res.status(201).json({ message: "Offer attached successfully", offer });
  } catch (err) {
    // Handle errors (e.g., validation)
    res.status(500).json({ error: err.message });
  }
};

// 🔸 GET /offer/:receiptId — Show receipt + offer (if available and active)
exports.getOffer = async (req, res) => {
  try {
    const { receiptId } = req.params; // Get receiptId from URL
    const offer = await Offer.findOne({ receiptId });

    // If no offer found, render blank
    if (!offer) {
      return res.render('receipt', { offer: null });
    }

    // Time check: current time should be within valid showTimeRange
    const now = new Date();
    const { start, end } = offer.showTimeRange || {};
    if (start && end && (now < start || now > end)) {
      return res.render('receipt', { offer: null }); // Outside range, don’t show
    }

    // Show offer
    res.render('receipt', { offer });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 🔸 POST /offer/click/:receiptId — Track click and redirect
exports.trackClick = async (req, res) => {
  try {
    const { receiptId } = req.params;

    // Increase click count by 1
    const offer = await Offer.findOneAndUpdate(
      { receiptId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    // If offer not found, show error
    if (!offer) return res.status(404).send("Offer not found");

    // Redirect user to CTA link
    res.redirect(offer.ctaLink);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
