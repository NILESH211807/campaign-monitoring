export default function Loading({ width = "80px", height = "80px" }: { width?: string, height?: string }) {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                style={{
                    width: width,
                    height: height,
                }}
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
        </div>

    );
}
