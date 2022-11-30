function Input({
    type,
    field,
    label,
    value,
    onChange,
    placeholder,
    error,
    ...validation
}) {
    return (
        <div>
            <label htmlFor={field} className='label pt-0'>
                <span>
                    <span className='label-text'>{label}</span>
                    <span className='ml-05 text-red-500' aria-hidden>*</span>
                </span>
                { (error) ? (
                    <span className='text-error text-right text-xs md:text-base'>{error}</span>
                ) : null }
            </label>
            <input type={type} id={field} name={field} value={value} onChange={onChange} placeholder={placeholder} {...validation} className={`input input-bordered w-full border-2 focus:outline-4 ${error ? 'input-error' : 'input-primary'}`} />
        </div>
    )
}

export default Input