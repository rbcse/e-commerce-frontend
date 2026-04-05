export const ValidateName = (name) => {
    const rules = [
        {
            id : 1,
            label : "At least 3 characters",
            test : v => v.length >= 3,
            error : "Name must contain at least 3 characters"
        },
        {
            id : 2,
            label : "At most 30 characters",
            test : v => v.length <= 30,
            error : "Name must contain at most 30 characters"
        },
        {
            id : 3,
            label : "Only alphabets are allowed",
            test : v => /^[a-zA-Z\s]+$/.test(v),
            error : "Name can have only alphabets"
        },
    ]

    const passed = rules.every(r => r.test(name))
    return {rules , passed};
}

export const ValidateEmail = (email) => {
    const rules = [
        {
            id : 1,
            label : "Valid email format",
            test : v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            error : "Invalid Email address"
        }
    ]

    const passed = rules.every(r => r.test(email))
    return {rules , passed}
}

export const ValidatePhoneNumber = (phoneNumber) => {
    const rules = [
        {
            id: 1,
            label: "Only digits allowed",
            test: v => /^[0-9]+$/.test(v),
            error: "Phone number must contain digits only"   
        },
        {
            id: 2,
            label: "Cannot start with 0",
            test: v => v[0] !== '0',
            error: "Phone number cannot start with 0"       
        },
        {
            id: 3,
            label: "Exactly 10 digits",
            test: v => v.length === 10,
            error: "Phone number must be exactly 10 digits" 
        },
    ]

    const passed = rules.every(r => r.test(phoneNumber))
    return { rules, passed }
}