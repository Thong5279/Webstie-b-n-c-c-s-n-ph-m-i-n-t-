const VNDtoUSD = (amount) => {
  // Tỷ giá cố định: 1 USD = 24,500 VND (bạn có thể cập nhật tỷ giá theo API)
  const exchangeRate = 24500;
  const usdAmount = amount / exchangeRate;
  // Làm tròn đến 2 chữ số thập phân
  return Math.round(usdAmount * 100) / 100;
};

module.exports = VNDtoUSD; 