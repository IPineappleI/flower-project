using System.ComponentModel.DataAnnotations;
using FlowerProjectAPI.Controllers;
using FlowerProjectAPI.Models;

namespace FlowerProjectAPI.Utility;

public static class Validator
{
    public static ValidationResult? ValidatePassword(string password) =>
        password.Length < 6
            ? new ValidationResult("password must be at least 6 symbols long")
            : ValidationResult.Success;

    public static ValidationResult? ValidateRole(string role) =>
        role is "client" or "manager" or "admin"
            ? ValidationResult.Success
            : new ValidationResult("no such role exists");

    public static ValidationResult? ValidateShoppingCart(Dictionary<string, int> shoppingCart)
    {
        foreach (var itemNameCountPair in shoppingCart)
        {
            var item = ItemsController.Read(itemNameCountPair.Key).Result;
            
            if (item == null)
            {
                return new ValidationResult("no such item in store");
            }
            
            if (itemNameCountPair.Value > item.Count)
            {
                return new ValidationResult("not enough items in store");
            }
        }
        
        return ValidationResult.Success;
    }
}