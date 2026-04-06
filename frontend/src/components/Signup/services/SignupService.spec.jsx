import "@testing-library/jest-dom"
import {beforeEach, describe,it, vi} from "vitest";
import { createCustomerAccount } from "./SignupService";
import * as apiService from "../../../services/apiService"

describe("TestSignupService",() => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    it("Should call the api correctly and return the response when the details are valid",async () => {
        const mockResponse = {
            is_signup_successful : true,
            message : "Customer account created successfully"
        }

        vi.spyOn(apiService,"post").mockResolvedValue(mockResponse)

        const customerDetails = {
            name : "rahul",
            email : "rahul@gmail.com",
            phone_number : "+917665718067",
            password : "Rahul@1234"
        }

        const result = await createCustomerAccount(customerDetails)
        expect(apiService.post).toHaveBeenCalledOnce()
        expect(apiService.post).toHaveBeenCalledWith("/customer/signup",customerDetails);

        expect(result).toEqual(mockResponse);
    })

})