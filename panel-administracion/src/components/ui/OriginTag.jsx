const OriginTag = ({ status }) => {
  let statusBgColor = '';
  let statusTextColor = '';
  switch (status) {
    case 'digital':
      statusBgColor = 'bg-cyan-200';
      statusTextColor = 'text-cyan-800';
      break;
    case 'fisico':
      statusBgColor = 'bg-lime-200';
      statusTextColor = 'text-lime-800';
      break;
    default:
      break;
  }

  return (
    <span
      className={`${statusBgColor} ${statusTextColor} whitespace-nowrap capitalize text-xs px-3 py-1 rounded-full`}
    >
      {status}
    </span>
  );
};

export default OriginTag;
