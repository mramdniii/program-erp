import { ProdGroup } from '../prod-group/prod-group.entity';
import { Vendor } from '../vendors/vendor.entity';
import { PurcDetail } from '../purc-orders/purc-detail.entity';
import { SaleDetail } from '../sales-orders/sale-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { StockAdjust } from '../stock-adjust/stock-adjust.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';
export declare class Product {
    id: number;
    code: string;
    name: string;
    description: string;
    prodGroup: number;
    vendors: number;
    unit: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    prodGroupRel: ProdGroup;
    vendorRel: Vendor;
    purcDetails: PurcDetail[];
    saleDetails: SaleDetail[];
    stockList: StockList;
    stockAdjusts: StockAdjust[];
    godownDiaries: GodownDiary[];
}
