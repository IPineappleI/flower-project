using System.ComponentModel.DataAnnotations;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Models;

public class User
{
    public int Id { get; set; }

    [Required] public string FirstName { get; set; }

    public string? LastName { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    [Required] [Phone] public string PhoneNumber { get; set; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidatePassword")]
    public string Password { get; set; }

    [Required]
    [CustomValidation(typeof(Validator), "ValidateRole")]
    public string Role { get; set; }
    
    public bool EmailConfirmed { get; set; }
    
    public Dictionary<int, int>? ShoppingCart { get; set; }

    public User(string firstName, string? lastName, string email, string phoneNumber, string password, string role, 
        Dictionary<int, int>? shoppingCart = null, int id = 0)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        Password = password;
        Role = role;
        EmailConfirmed = false;

        if (role != "client")
        {
            shoppingCart = null;
        }
        else if (shoppingCart == null)
        {
            shoppingCart = new Dictionary<int, int>();
        }

        ShoppingCart = shoppingCart;
    }
}