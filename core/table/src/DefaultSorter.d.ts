import { DataTable } from "./DataTable";
export declare class DefaultSorter<T> {
    private mfTable;
    private sortBy;
    private isSortedByMeAsc;
    private isSortedByMeDesc;
    constructor(mfTable: DataTable<T>);
    private sort();
}
