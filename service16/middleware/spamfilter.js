// Basic spam filter - checks if message is too short
function spamFilter(req, res, next) {
  const { message } = req.body;

  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'Message too short — possible spam.' });
  }

  next();
}

module.exports = spamFilter;