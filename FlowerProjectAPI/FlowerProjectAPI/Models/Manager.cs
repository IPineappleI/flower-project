using System.ComponentModel.DataAnnotations;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Models;

public class Manager
{
    [Required] public string Login { get; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidatePassword")]
    public string Password { get; }

    public bool IsAdmin { get; }

    public Manager(string login, string password, bool isAdmin = false)
    {
        Login = login;
        Password = password;
        IsAdmin = isAdmin;
    }
}