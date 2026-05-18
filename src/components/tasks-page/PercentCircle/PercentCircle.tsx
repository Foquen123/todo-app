import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PercentCircle({
  value,
  pathColor,
  desc,
}: {
  value: number;
  pathColor: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-25 h-25 select-none font-medium">
        <CircularProgressbar
          strokeWidth={10}
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: 'black',
            textSize: '20px',
            pathColor: pathColor,
            // trailColor: 'var(--success-100)',
            trailColor: '#fff',
          })}
        />
      </div>
      <div className="text-[15px] flex gap-2 items-center">
        <div
          className="w-2 h-2 rounded-full "
          style={{ background: pathColor }}
        ></div>{' '}
        {desc}
      </div>
    </div>
  );
}
