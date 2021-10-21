export interface UserAddressDetails {
    id: number;
    userDetailsId: number;
    name: string;
    is_billing_address: boolean;
    is_same_as_postal_add: boolean;
    country: string;
    address_line_1: string;
    address_line_2: string;
    state: string;
    postal_code: string;
    city: string;
    created_date: Date;
    is_active: boolean;
    additionAddId: number;
}
