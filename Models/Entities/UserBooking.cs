using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class UserBooking
    {
        public int UserBookingId { get; set; }
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public Booking Booking { get; set; }
        public User User { get; set; }
    }
}
