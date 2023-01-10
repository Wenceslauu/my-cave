import { useTransition, animated, config } from "@react-spring/web"

function SuccessBox({
    successes,
    show,
    closeWarning,
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

    function successItems(style) {
        return (
            successes.map((success, index) => {
                return (
                    <animated.div key={index} className={`alert alert-success`} style={style}>
                        <div className='flex justify-center items-center w-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-5 w-5" fill="white" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/></svg>
                            <span>{success}</span>
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
                    {successItems(style)}
                </div>
            ))
        })
    )
}

export default SuccessBox