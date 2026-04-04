import { post } from "../../../services/apiService"

export const createCustomerAccount = async (customerDetails) => {
    const response = await post("/customer/signup",customerDetails)
    return response;
}