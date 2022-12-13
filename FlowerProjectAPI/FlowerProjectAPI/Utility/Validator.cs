using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Utility;

public static class Validator
{
    public static ValidationResult? ValidatePassword(string password) =>
        password.Length < 6
            ? new ValidationResult("password must be at least 6 symbols long")
            : ValidationResult.Success;
}