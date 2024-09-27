const displayVNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0 // Không hiển thị phần thập phân cho VND
    });
    return formatter.format(num);
};

export default displayVNDCurrency;
