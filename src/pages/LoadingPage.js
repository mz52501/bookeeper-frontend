import React from "react";

export default function LoadingPage() {

    return (
        <div
            className="flex-1 flex flex-col overflow-auto items-center justify-center">
            <div>
                <p className="text-6xl bg-gradient-to-br from-blue-300 to-blue-600 bg-clip-text text-transparent">Loading...</p>
            </div>
        </div>
    )
}
