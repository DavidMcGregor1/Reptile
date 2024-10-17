package com.example.demo.Login;

import java.util.Optional;

public class SignUpResponseDto {
    public boolean success;
    Optional<ErrorType> errorType;

    public SignUpResponseDto(boolean success, Optional<ErrorType> errorType) {
        this.success = success;
        this.errorType = errorType;
    }

    public SignUpResponseDto() {
        this.success = false; // Default to false if not specified
        this.errorType = Optional.empty(); // Initialize as empty
    }

    public boolean getSuccess() {
        return success;
    }

    public Optional<ErrorType> getErrorType() {
        return errorType;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setErrorType(Optional<ErrorType> errorType) {
        this.errorType = errorType;
    }
}
