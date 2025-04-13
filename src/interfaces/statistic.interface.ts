export interface IStatisticRevenueCount {
    numberOfSuccess: number;
    numberOfFailed: number;
    numberOfPending: number;
    totalRevenue: number;
}

export interface IStatisticCount {
    numberOfManga: number;
    numberOfUser: number;
    numberOfCategory: number;
}

export interface IStatisticRevenue extends IStatisticRevenueCount {
    revenue: number[];
    date: Date[];
}

export interface IStatisticCategory {
    name: string[],
    mangaPercentage: number[],
}