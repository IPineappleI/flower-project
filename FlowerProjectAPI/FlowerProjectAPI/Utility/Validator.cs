using System.ComponentModel.DataAnnotations;
using FlowerProjectAPI.Controllers;

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
            : new ValidationResult($"invalid role name ({role})");

    public static ValidationResult? ValidateShoppingCart(Dictionary<int, int> shoppingCart)
    {
        foreach (var itemIdCountPair in shoppingCart)
        {
            var item = ItemsController.ReadById(itemIdCountPair.Key).Result;

            if (item == null)
            {
                return new ValidationResult($"invalid item id in shopping cart ({itemIdCountPair.Key})");
            }

            if (itemIdCountPair.Value > item.Count)
            {
                return new ValidationResult($"not enough items with id {itemIdCountPair.Key} " +
                                            $"in store ({itemIdCountPair.Value}/{item.Count})");
            }
        }

        return ValidationResult.Success;
    }
}