const express = require('express');
const router = express.Router();
const pushVOIP = require('../../api/v1/push/pushVOIP');
const axios = require('axios');

router.post('/send-voip-push', async (req, res) => {
  try {
    const users = await fetchAllUsersFromAPI();

    const results = [];

    for (const user of users) {
      // ✅ skip invalid tokens
      if (!user.fcmToken || user.fcmToken.trim() === '') {
        continue;
      }

      // ✅ FCM data payload (strings only)
      const data = {
        user_id: String(user._id),
        user_name: String(user.name),
        type: 'incoming_call',
      };

      try {
        const result = await pushVOIP(user.fcmToken, data);
        results.push({
          user_id: user._id,
          status: 'success',
          response: result,
        });

      } catch (error) {
        results.push({
          user_id: user._id,
          status: 'failed',
          error: error.response?.data || error.message,
        });
        continue;
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Push sent successfully',
      total_users: users.length,
      push_sent_to: results.length,
      fcm_response: results,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send push',
      error: error.message,
    });
  }
});


const fetchAllUsersFromAPI = async () => {
  const response = await axios.get(
    process.env.BACKEND_URL+"/v1/api/admin/getAllUsers"
  );

  const users = response.data.users;

  return Array.isArray(users) ? users : [];
};

module.exports = router;
