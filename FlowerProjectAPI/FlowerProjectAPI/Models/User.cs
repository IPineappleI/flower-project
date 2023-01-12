using System.ComponentModel.DataAnnotations;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Models;

public class User
{
    [Required] [EmailAddress] public string Email { get; set; }

    [Required] [Phone] public string PhoneNumber { get; set; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidatePassword")]
    public string Password { get; set; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidateRole")]
    public string Role { get; set; }

    [CustomValidation(typeof(Validator), "ValidateShoppingCart")]
    public Dictionary<string, int> ShoppingCart { get; set; }

    public User(string email, string phoneNumber, string password, string role,
        Dictionary<string, int>? shoppingCart = null)
    {
        Email = email;
        PhoneNumber = phoneNumber;
        Password = password;
        Role = role;
        
        if (role != "client")
        {
            shoppingCart = null;
        }

        ShoppingCart = shoppingCart ?? new Dictionary<string, int>();
    }
}