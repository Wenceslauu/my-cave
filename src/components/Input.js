function Input({
    isTextArea=false,
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
        <div className={`${(isTextArea) ? 'w-full' : ''}`}>
            <label htmlFor={field} className='label pt-0'>
                { (label) ? (<span>
                    <span className='label-text'>{label}</span>
                    <span className='ml-05 text-red-500' aria-hidden>*</span>
                </span>) : null }
                { (error) ? (
                    <span className='text-error text-right text-xs md:text-base'>{error}</span>
                ) : null }
            </label>
            {(!isTextArea) ?
                <input type={type} id={field} name={field} value={value} onChange={onChange} placeholder={placeholder} {...validation} className={`input input-bordered w-full border-2 focus:outline-4 ${error ? 'input-error' : 'input-primary'}`} />
                : <textarea id={field} name={field} value={value} onChange={onChange} {...validation} className={`textarea textarea-bordered w-full border-2 h-32 max-h-32 focus:outline-4 ${error ? 'textarea-error' : 'textarea-primary'}`} />
            }
        </div>
    )
}

export default Input