const devices = new Map();

exports.authorizeDevice = (req, res) => {
  const { deviceId, token } = req.body;
  if (!deviceId || !token) return res.status(400).json({ error: "Missing credentials" });
  devices.set(deviceId, { authorized: true });
  res.status(200).json({ message: "Device authorized" });
};

exports.getDeviceData = (req, res) => {
  const { deviceId } = req.params;
  const device = devices.get(deviceId);
  if (!device) return res.status(404).json({ error: "Device not found" });
  res.json({ deviceId, data: "Simulated data", timestamp: new Date() });
};