using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Item
{
    [Required] public string Name { get; }

    [Required] public decimal Price { get; }

    [Required] public int Count { get; }

    public Item(string name, decimal price, int count)
    {
        Name = name;
        Price = price;
        Count = count;
    }
}