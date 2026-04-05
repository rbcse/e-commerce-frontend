import { useState } from "react"
import { PasswordService } from "../services/PasswordService"
import { getCountries } from "../services/CountryService"
import { ValidateName , ValidateEmail , ValidatePhoneNumber } from "../services/ValidationService"
import { createCustomerAccount } from "../services/SignupService"

export const UseSignup = () => {

    const [touched , setTouched] = useState({
        name : false,
        email : false,
        phoneNumber : false,
        password : false,
    })

    const [showPassword , setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleBlur = (field) => {
        setTouched(prev => ({
            ...prev,
            [field] : true
        }))
    }

    const getError = (rules,value) => {
        const firstFail = rules.find(r => !r.test(value))
        return firstFail ? firstFail.error : null
    }

    
    const countries = getCountries();
    
    const options = countries.map(country => ({
        value: country.dialCode,
        label:`${country.dialCode} ${country.name}`,
    }))
    let [customerDetails , setCustomerDetails] = useState({
        name : "",
        email : "",
        phoneCode : null,
        phoneNumber : "",
        password : "",
    })
    
    const {rules : nameRules , passed : namePassed} = ValidateName(customerDetails.name)
    const {rules : emailRules , passed : emailPassed} = ValidateEmail(customerDetails.email)
    const {rules : phoneNumberRules , passed : phoneNumberPassed} = ValidatePhoneNumber(customerDetails.phoneNumber)
    const {rules : passwordRules , score , strength , color} = PasswordService({
        password : customerDetails.password
    })

    const validationErrors = {
        name : getError(nameRules,customerDetails.name),
        email : getError(emailRules,customerDetails.email),
        phoneNumber : getError(phoneNumberRules,customerDetails.phoneNumber),
        password : getError(passwordRules,customerDetails.password),
    }

    const handleFieldChange = (field , value) => {
        setCustomerDetails(prev => (
            {
                ...prev,
                [field] : value
            }
        ))
    }

    const isSignupFormValid = namePassed && emailPassed && phoneNumberPassed && (score === 6);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isSignupFormValid) return
        customerDetails = {
            ...customerDetails,
            "phoneCode" : customerDetails.phoneCode.value
        } 

        const payload = {
            name : customerDetails.name,
            email : customerDetails.email,
            phone_number : `${customerDetails.phoneCode}${customerDetails.phoneNumber}`,
            password : customerDetails.password
        }
        
        const response = await createCustomerAccount(payload);
        console.log(response)
    }

    return {
        customerDetails,
        options,
        handleFieldChange,
        isSignupFormValid,
        handleSubmit,
        nameRules,
        emailRules,
        phoneNumberRules,
        passwordRules,
        score,
        strength,
        color,
        touched,
        validationErrors,
        handleBlur,
        showPassword,
        togglePassword
    }

}