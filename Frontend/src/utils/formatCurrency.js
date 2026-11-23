export function formatCurrency(amount) {
    if (amount === null || amount  === undefined || amount === "") {
        return "Not provided"
    }
    const cleanedAmount = String(amount).replace(/[^0-9.-]/g, "")

    if (cleanedAmount === "") {
        return "Not provided"
    }

    const numericAmount = Number(cleanedAmount)

    if (!Number.isFinite(numericAmount)) {
        return "Not Provided"
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(Number(numericAmount))
}