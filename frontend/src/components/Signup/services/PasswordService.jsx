export const PasswordService = ({password}) => {

    const rules = [
        {
            id : 1,
            label : "Lowercase letter",
            test : v => /[a-z]/.test(v),
            error:"Password must contain at least one lowercase letter"
        },
        {
            id : 2,
            label : "Uppercase letter",
            test : v => /[A-Z]/.test(v),
            error:"Password must contain at least one uppercase letter"
        },
        {
            id : 3,
            label : "Special Character out of (@ , # , $ , % , &)",
            test : v => /[@#$%&]/.test(v),
            error:"Password must contain at least one special character"
        },
        {
            id : 4,
            label : "Digit",
            test : v => /[0-9]/.test(v),
            error:"Password must contain at least one digit"
        },
        {
            id : 5,
            label : "Minimum 8 characters",
            test : v => v.length >= 8,
            error:"Password must be of minimum 8 characters"
        },
        {
            id : 6,
            label : "Maximum 15 characters",
            test : v => v.length >= 1 && v.length <= 15,
            error:"Password must be of maximum 15 characters"
        },
    ]

    let score = rules.filter(r => r.test(password)).length;

    const getStrength = () => {
        if(!password) return {strength : "Very Low" , color : "gray"}
        else if(score <= 2) return {strength : "Low" , color : "red"}
        else if(score <= 5) return {strength : "Medium" , color : "yellow"}
        else return {strength : "High" , color : "green"}
    }

    return {rules , score , ...getStrength()}

}