import React from "react";
import DownloadIcon from "../../../../svg/Download";

const FileOthers = ({ file, type }) => {
    return (
        <div className="bg-green_4 p-2 rounded-lg">
            {/* Container */}
            <div className="flex justify-between gap-x-8">
                {/* File infos */}
                <div className="flex items-center gap-2">
                    <img src={`../../../../images/file/${type}.png`} alt="" className="w-8 object-contain" />
                    <div className="flex flex-col gap-2">
                        <h1>
                            {file.original_filename}.{file.public_id.split(".")[1]}
                        </h1>
                        <span className="text-sm">
                            {type} . {file.bytes}B
                        </span>
                    </div>
                </div>
                {/* Download button */}
                <a href={file.secure_url} target="_blank" download rel="noreferrer">
                    <DownloadIcon />
                </a>
            </div>
        </div>
    );
};

export default FileOthers;
