import { useTransition, animated, config } from "@react-spring/web"

function ErrorBox({
    errors,
    show,
    closeWarning
}) {
    const transition = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: show,
        delay: 300,
        config: config.molasses,
        onRest: closeWarning
    })

    function errorItems(style) {
        return (
            errors.map((error, index) => {
                return (
                    <animated.div key={index} className={`alert alert-error`} style={style}>
                        <div className='flex justify-center w-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    </animated.div>
                )
            })
        )
    }

    return (
        transition((style, item) => {
            return (item && (
                <div className="w-2/3 md:w-1/4 fixed bottom-12 left-2/4 -translate-x-1/2 flex flex-col-reverse gap-4">
                    {errorItems(style)}
                </div>
            ))
        })
    )
}

export default ErrorBox