﻿using System.ComponentModel.DataAnnotations;

namespace Models.Entities.Base
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
