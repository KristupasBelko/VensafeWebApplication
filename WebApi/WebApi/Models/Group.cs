using System.Collections.Generic;

namespace WebApi.Models
{
    public class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int AgeLimit { get; set; }
        public bool IsAnonymous { get; set; }
        public List<Brand> Brands { get; set; }

        public Group()
        {
            Brands = new List<Brand>();
        }
    }
}
