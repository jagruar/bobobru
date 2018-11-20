using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class Booking
    {
        public int BookingId { get; set; }

        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        public DateTime ExpectedArrival { get; set; }
        public DateTime ActualArrival { get; set; }

        public DateTime ExpectedCheckout { get; set; }
        public DateTime ActualCheckout { get; set; }

        public int ExpectedGuests { get; set; }
        public int ActualGuests { get; set; }

        public bool DidShow { get; set; }

        public ICollection<BookingTable> BookingTables { get; set; }
        public ICollection<UserBooking> UserBookings { get; set; }
    }
}