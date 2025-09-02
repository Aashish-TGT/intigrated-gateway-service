const { getRandomTemplates } = require('../services/templateService');
const Event = require('../models/Event');

exports.serveTwoTemplates = async (req, res) => {
  try {
    const templates = await getRandomTemplates();
    const { userId } = req.query;

    await Event.create({
      userId,
      templateId: null,
      eventType: "exposure",
      metadata: { shownTemplates: templates.map(t => t._id) }
    });

    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.trackEvent = async (req, res) => {
  try {
    const { templateId, userId, eventType } = req.body;
    if (!["open", "share"].includes(eventType)) {
      return res.status(400).json({ error: "Invalid eventType" });
    }

    await Event.create({ templateId, userId, eventType });
    res.status(201).json({ message: 'Event tracked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getABReport = async (req, res) => {
  try {
    const result = await Event.aggregate([
      { $match: { eventType: { $in: ['open', 'share'] } } },
      {
        $group: {
          _id: { templateId: "$templateId", eventType: "$eventType" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.templateId",
          events: {
            $push: {
              type: "$_id.eventType",
              count: "$count"
            }
          }
        }
      },
      {
        $lookup: {
          from: 'templates',
          localField: '_id',
          foreignField: '_id',
          as: 'template'
        }
      },
      { $unwind: "$template" }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
