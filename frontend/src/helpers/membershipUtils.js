// Định nghĩa các hạng thành viên và điều kiện
const MEMBERSHIP_TIERS = {
    BRONZE: {
        name: "Khách Hàng VIP Đồng",
        minSpend: 0,
        maxSpend: 10000000, // 10 triệu
        color: "text-amber-600",
        icon: "🥉"
    },
    SILVER: {
        name: "Khách Hàng VIP Bạc", 
        minSpend: 10000000,
        maxSpend: 30000000, // 30 triệu
        color: "text-gray-400",
        icon: "🥈"
    },
    GOLD: {
        name: "Khách Hàng VIP Vàng",
        minSpend: 30000000,
        maxSpend: 50000000, // 50 triệu
        color: "text-yellow-500",
        icon: "🥇"
    },
    DIAMOND: {
        name: "Khách Hàng VIP Kim Cương",
        minSpend: 50000000,
        maxSpend: Infinity,
        color: "text-blue-500",
        icon: "💎"
    }
};

// Tính điểm tích lũy (1000đ = 1 điểm)
export const calculatePoints = (totalSpend) => {
    return Math.floor(totalSpend / 1000);
};

// Xác định hạng thành viên dựa trên tổng chi tiêu
export const determineCustomerTier = (totalSpend) => {
    for (const tier of Object.values(MEMBERSHIP_TIERS)) {
        if (totalSpend >= tier.minSpend && totalSpend < tier.maxSpend) {
            return tier;
        }
    }
    return MEMBERSHIP_TIERS.BRONZE; // Mặc định là hạng đồng
};

// Tính số tiền cần chi tiêu thêm để lên hạng
export const calculateNextTierProgress = (totalSpend) => {
    const currentTier = determineCustomerTier(totalSpend);
    const tiers = Object.values(MEMBERSHIP_TIERS);
    const currentIndex = tiers.findIndex(tier => tier.name === currentTier.name);
    
    // Nếu đã là hạng cao nhất
    if (currentIndex === tiers.length - 1) {
        return {
            nextTier: null,
            remainingAmount: 0,
            progress: 100
        };
    }

    const nextTier = tiers[currentIndex + 1];
    const remainingAmount = nextTier.minSpend - totalSpend;
    const progress = (totalSpend - currentTier.minSpend) / 
                    (nextTier.minSpend - currentTier.minSpend) * 100;

    return {
        nextTier,
        remainingAmount,
        progress: Math.min(Math.max(progress, 0), 100) // Giới hạn progress từ 0-100
    };
};

// Export các hằng số nếu cần sử dụng ở nơi khác
export const TIERS = MEMBERSHIP_TIERS; 