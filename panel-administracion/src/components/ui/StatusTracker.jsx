import { formatDate } from '../../utils/format';

const StatusTracker = ({ data }) => {
  return (
    <div className="text-xs md:text-sm">
      {data.map((item) => (
        <div className="flex gap-2 mb-4" key={item.id}>
          <span
            className={`relative top-2.5 h-2 w-2 ${item.estado === 'rechazada' ? 'bg-red-500' : item.activo ? 'bg-green-500' : 'border-2 border-green-500'} flex items-center justify-center rounded-full`}
          ></span>
          <div>
            <p
              className={`text-base ${item.estado === 'rechazada' ? 'text-red-500 font-bold' : item.activo ? 'text-green-500 font-bold' : 'text-slate-400'}`}
            >
              {item.estado}
            </p>
            <p className="text-slate-500">{formatDate(item.fecha, 'DD MMM YYYY, HH:mm')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTracker;
