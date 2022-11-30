function Avatar({
    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    alt
}) {
    return (
        <div className="avatar">
            <div className="w-12 rounded-full">
                <img src={src} alt={alt} className='scale-[1.15]'/>
            </div>
        </div>
    )
}

export default Avatar