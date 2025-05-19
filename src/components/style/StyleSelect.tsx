interface StyleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title?: string
}

const StyleSelect: React.FC<StyleSelectProps> = ({ title, children, ...rest }) => {
  return (
    <div className="relative">
      {title && <label className="text-sm mb-1 block">{title}</label>}
      <select
        {...rest}
        className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
      >
        {children}
      </select>
    </div>
  )
}

export default StyleSelect
