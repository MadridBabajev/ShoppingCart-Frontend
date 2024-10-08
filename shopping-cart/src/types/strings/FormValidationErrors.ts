enum FormValidationErrors {
    EMAIL_REQUIRED = "Email is required",
    PASSWORD_REQUIRED = "Password is required",
    FIRST_NAME_REQUIRED = "First name is required",
    LAST_NAME_REQUIRED = "Last name is required",
    MOBILE_REQUIRED = "Mobile phone is required",
    EMAIL_INVALID = "Email is invalid",
    WEAK_PASSWORD = "Password does not meet the requirements",
    PASSWORDS_MISMATCH = "Passwords do not match",
    AVAILABILITY_UNSELECTED = "* All values must be selected",
    AVAILABILITY_INVALID = "* To time should be greater than From time",
    VALUES_NOT_SET = "* Values have not been set",
    BANK_ACCOUNT_NUMBER_INVALID = "* Bank Account Number must be 14 to 18 digits",
    ACCOUNT_TYPE_INVALID = "* Invalid Bank Account Type",
    BIO_TOO_BIG = "* Bio is too  large!",
    TITLE_TOO_BIG = "* Title is too large!",
    MOBILE_INVALID = "* Invalid phone number",
    FIRST_NAME_EMPTY = "* First name can't be empty",
    LAST_NAME_EMPTY = "* Last name can't be empty",
}

export default FormValidationErrors;