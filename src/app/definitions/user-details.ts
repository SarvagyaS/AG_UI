import { UserAddressDetails } from "./user-address-details";

export interface UserDetails {
    id: number,
    first_name: string,
    last_name: string,
    nick_name: string,
    email: string,
    country_code: string,
    mobile: string,
    password: string,
    is_otp_verified: boolean,
    register_from: string,
    is_profile_update: boolean,
    gender: string,
    dob: string,
    hear_aboutus: string,
    interested_in: string,
    interested_in_bidding: string,
    gst_no: string,
    device_code: string,
    last_login_date: Date,
    profile_update_date: Date,
    registration_date: Date,
    user_ip: string,
    is_active: boolean,
    token: string,
    user_agent: string,

    //NotMapped
    userAddressDetails: UserAddressDetails[]
}