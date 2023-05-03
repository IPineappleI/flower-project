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

    public int? ShoppingCartId { get; set; }
    
    public bool EmailConfirmed { get; set; }

    public User(string email, string phoneNumber, string password, string role, string firstName, string? lastName, 
        bool emailConfirmed = false, int id = 0, int? shoppingCartId = null)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        Password = password;
        Role = role;
        EmailConfirmed = emailConfirmed;

        if (role != "client")
        {
            shoppingCartId = null;
        }

        ShoppingCartId = shoppingCartId;
    }
}