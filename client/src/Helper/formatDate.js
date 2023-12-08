import { format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale'; 

const formatDate = (dateString) => {
  if (!dateString) {
    return ''; 
  }

  const parsedDate = parseISO(dateString);
  const formattedDate = format(parsedDate, 'dd MMM, yyyy', { locale: enGB });

  return formattedDate;
};

export default formatDate;
