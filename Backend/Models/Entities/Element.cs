using Models.Entities.Base;

namespace Models.Entities
{
    public class Element : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ElementType { get; set; }
    }
}
