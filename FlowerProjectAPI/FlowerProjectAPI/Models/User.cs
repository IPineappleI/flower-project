using System.ComponentModel.DataAnnotations;
using Validator = FlowerProjectAPI.Utility.Validator;

namespace FlowerProjectAPI.Models;

public class User
{
    public int Id { get; set; }

    [Required] public string FirstName { get; set; }

    public string? LastName { get; set; }

    [Required]
    [RegularExpression(@"^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$")]
    public string Email { get; set; }

    [Required]
    [RegularExpression(@"^\(?\+?[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?$")]
    public string PhoneNumber { get; set; }

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