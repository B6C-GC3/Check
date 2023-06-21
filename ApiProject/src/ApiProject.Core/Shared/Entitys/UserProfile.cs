﻿using Abp.Authorization.Roles;
using Abp.Domain.Entities;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Shared.Entitys
{
    [Table("UserProfile")]
    public class UserProfile : Entity<long>
    {
        [Required]
        public string Name { get; set; }
        public int Sexe { get; set; }
        public string Email { get; set; }
        public string NumberPhone { get; set; }
        public long? Nationality { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public long AvatarId { get; set; }
        public string Nickname { get; set;}
        /* ---------------------------------------------------------*/

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public DateTime? CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
    }
}
