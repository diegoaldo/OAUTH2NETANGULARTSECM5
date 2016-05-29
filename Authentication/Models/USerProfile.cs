using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Authentication.Models
{
    public class USerProfile : IdentityUser
    {
        public string Notes { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
       
    }   

}