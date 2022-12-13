using System.ComponentModel.DataAnnotations;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Models;

public class Client
{
    [Required] [EmailAddress] public string Email { get; }

    [Required] [Phone] public string PhoneNumber { get; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidatePassword")]
    public string Password { get; }

    public Dictionary<string, int> ShoppingCart { get; }

    public Client(string email, string phoneNumber, string password, Dictionary<string, int>? shoppingCart = null)
    {
        Email = email;
        PhoneNumber = phoneNumber;
        Password = password;
        ShoppingCart = shoppingCart ?? new Dictionary<string, int>();
    }
}