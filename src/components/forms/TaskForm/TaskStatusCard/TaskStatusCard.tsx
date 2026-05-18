

export default function TaskStatusCard({
  bgColor,
  borderColor,
  isSelect,
  title,
  onClick,
}: {
  borderColor: string;
  bgColor: string;
  title: string;
  isSelect: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative inline-block">
      {isSelect && (
        <div
          className="absolute rounded-[18px] "
          style={{
            inset: '-6px',
            border: `2px dashed ${borderColor}`,
            borderRadius: '14px',
          }}
        />
      )}

      <button
        type="button"
        onClick={onClick}
        className="relative p-2.5 rounded-[10px] select-none cursor-pointer"
        style={{ border: `1px solid ${borderColor}`, background: `${bgColor}` }}
      >
        {title}
      </button>
    </div>
  );
}