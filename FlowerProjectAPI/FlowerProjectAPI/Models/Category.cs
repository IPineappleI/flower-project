using System.ComponentModel.DataAnnotations;

namespace FlowerProjectAPI.Models;

public class Category
{
    public int? Id { get; set; }

    [Required] public string Name { get; set; }

    public Category(string name, int? id = null)
    {
        Id = id;
        Name = name;
    }
}