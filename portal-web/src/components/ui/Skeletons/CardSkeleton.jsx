const CardSkeleton = () => {
    return (
        <div className="relative flex flex-col gap-4 shadow shadow-slate-600 p-5 bg-white">
            <p className="h-8 flex items-center justify-center bg-gray-200 rounded-full animate-pulse"></p>
            <p className="h-8 flex items-center justify-center bg-gray-200 rounded-full animate-pulse"></p>
        </div>
    )
}

export default CardSkeleton