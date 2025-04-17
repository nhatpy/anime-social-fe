export function convertToLocalDate(date: Date): string {
    const newDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - newDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay >= 1) {
        return `${diffDay} ngày trước`;
    } else if (diffHour >= 1) {
        return `${diffHour} giờ trước`;
    } else {
        return "Mới đây";
    }
}
