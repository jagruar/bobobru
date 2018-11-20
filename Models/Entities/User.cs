using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }

        public int Score { get; set; }

        public ICollection<UserBooking> UserBookings { get; set; }
    }
}
