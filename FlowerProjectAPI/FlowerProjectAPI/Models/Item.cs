using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Item
{
    [Required] public string Name { get; set; }

    [Required] public decimal Price { get; set; }

    [Required] public int Count { get; set; }

    public Item(string name, decimal price, int count)
    {
        Name = name;
        Price = price;
        Count = count;
    }
}