import PostSection from '../components/PostSection'

function Feed() {
    return (
        <>
            <div className='flex gap-12 px-0 sm:px-8 md:px-40 items-start'>
                <div className='basis-0 grow-[3] bg-base-300 rounded-box p-4 min-w-0'>
                    <PostSection />
                </div>
                <div className='basis-0 grow-[1] bg-base-300 rounded-box p-4 hidden lg:block'>
                    friend suggestions
                </div>
            </div>
        </>
    )
}

export default Feed