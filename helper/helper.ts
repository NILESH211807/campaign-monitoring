// formatCurrency
function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// formatDate
const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = dateString.split('T')[0];
    const [year, month, day] = date.split('-');

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    }).format(new Date(dateString));

    return `${day}-${month}-${year} : ${formattedTime}`;
};

function getStatusClass(status: string) {
    switch (status) {
        case "active":
            return "bg-emerald-500/5 text-emerald-400 border-emerald-500/30";
        case "paused":
            return "bg-amber-500/5 text-amber-400 border-amber-500/30";
        case "completed":
            return "bg-slate-500/5 text-slate-400 border-slate-500/30";
        default:
            return "bg-gray-500/5 text-gray-400 border-gray-500/30"
    }
}

function getPlatClass(platform: string) {
    switch (platform.toLocaleLowerCase()) {
        case "meta":
            return "bg-blue-500/5 text-blue-400 border-blue-500/30";
        case "google":
            return "bg-red-500/5 text-red-400 border-red-500/30";
        case "linkedin":
            return "bg-sky-500/5 text-sky-400 border-sky-500/30";
        default:
            return "bg-gray-500/5 text-gray-400 border-gray-500/30";
    }
}

export { formatCurrency, formatDate, getStatusClass, getPlatClass };