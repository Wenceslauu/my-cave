function Avatar({
    src="https://res.cloudinary.com/dtxsobdxk/image/upload/c_scale,h_512,w_512/v1672439103/3dcd4af5bc9e06d36305984730ab7888_nyy3bw.jpg",
    alt,
    customWidth=''
}) {
    return (
        <div className="avatar">
            <div className={`${customWidth} rounded-full`}>
                <img src={src} alt={alt} />
            </div>
        </div>
    )
}

export default Avatar