// services/syncTally.js

/**
 * Sync receipt to Tally (Mock Implementation)
 * Replace with actual API logic for real integration.
 * @param {Object} receipt - Receipt document from the database
 * @returns {Object} Sync status
 */
module.exports = async (receipt) => {
  try {
    // ✅ Log what's being synced
    console.log("🔁 Syncing to Tally:", receipt);

    // ✅ Mock response
    const response = {
      platform: 'tally',
      synced: true,
      timestamp: new Date(),
      referenceId: receipt._id || null,
      message: 'Successfully synced with Tally (mock)'
    };

    return response;

  } catch (error) {
    console.error("❌ Tally sync failed:", error.message);
    throw new Error("Tally sync failed: " + error.message);
  }
};
