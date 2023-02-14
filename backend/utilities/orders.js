const calculateProductScore = (price, availability) => {
    return price * 0.5 + availability * 0.5;
};

const calculateItemScore = (price, availability) => {
    return price * 0.5 + availability * 0.5;
};

module.exports = {
    calculateProductScore,
    calculateItemScore
};