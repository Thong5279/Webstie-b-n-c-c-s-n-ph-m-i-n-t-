// controllers/adminController.js
// Load cho danh muc khach hang than thiet cho admin
const User = require("../../models/userModel");
const {
  determineCustomerTier,
  calculatePoints,
  calculateNextTierProgress,
} = require("../../../frontend/src/helpers/membershipUtils");

const getAllUsersWithTiers = async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithTiers = users.map((user) => {
      const { totalSpend } = user;
      const tier = determineCustomerTier(totalSpend);
      const points = calculatePoints(totalSpend);
      const nextTierProgress = calculateNextTierProgress(totalSpend);

      return {
        ...user.toObject(),
        tier: tier.name,
        tierIcon: tier.icon,
        tierColor: tier.color,
        points,
        nextTierProgress,
      };
    });

    res.status(200).json({ success: true, data: usersWithTiers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách người dùng.",
      error,
    });
  }
};

module.exports = { getAllUsersWithTiers };
