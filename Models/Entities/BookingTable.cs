using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class BookingTable
    {
        public int BookingTableId { get; set; }
        public int BookingId { get; set; }
        public int TableId { get; set; }
        public Booking Booking { get; set; }
        public Table Table { get; set; }        
    }
}
