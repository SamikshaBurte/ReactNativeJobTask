const RUPEE_CONVERSION_FACTOR = 75; 

export const isPrime = (num) => {
    if (num <= 1) return false;
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

const countVowels = (text) => {
    if (!text) return 0;
    const matches = text.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
};

export const calculatePrice = (title, description) => {
    const titleLength = title ? title.length : 0;
    const vowelCount = countVowels(description);
    
    const basePriceInCents = (titleLength * 10) + vowelCount;

    const finalPrice = (basePriceInCents / 100) * RUPEE_CONVERSION_FACTOR;

    const formattedPrice = finalPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR', 
        minimumFractionDigits: 2,
    });

    return {
        raw: finalPrice,
        formatted: formattedPrice
    };
};