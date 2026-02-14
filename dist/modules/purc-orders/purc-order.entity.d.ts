import { Vendor } from '../vendors/vendor.entity';
import { PurcDetail } from './purc-detail.entity';
export declare class PurcOrder {
    id: number;
    orderNo: string;
    orderDate: Date;
    vendors: number;
    totalAmount: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    vendorRel: Vendor;
    details: PurcDetail[];
}
