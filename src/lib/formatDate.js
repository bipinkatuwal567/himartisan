export  function formatDate(dateString) {
      // Parse the date string
      const date = new Date(dateString);
  
      // Define the month names
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
      // Extract date components
      const day = date.getUTCDate();
      const month = monthNames[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
  
      // Format hours and minutes into 24-hour format with added custom text
      const formattedTime = (hours === 24 ? '24' : hours.toString().padStart(2, '0')) + ':' + minutes.toString().padStart(2, '0');
  
      // Combine date and time into desired format
      return `${month} ${day}, ${year} ${formattedTime}`;
  }

 export  function isNotYetDelivered(deliveredOn) {
      const deliveredDate = new Date(deliveredOn);
      const currentDate = new Date();
  
      // Normalize dates to only compare year, month, and date
      const deliveredDateOnly = new Date(deliveredDate.getUTCFullYear(), deliveredDate.getUTCMonth(), deliveredDate.getUTCDate());
      const currentDateOnly = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());
  
      return deliveredDateOnly > currentDateOnly;
  }
  
  