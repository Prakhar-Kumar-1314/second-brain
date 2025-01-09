import {ShareIcon} from "./icons/ShareIcon.tsx";
import {PlusIcon} from "./icons/PlusIcon.tsx";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

const getYouTubeEmbedURL = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export const Card = (props: CardProps) => {
    return (
        <div>
            <div className={"bg-white-600 p-2 rounded-md shadow-md border border-slate-100 max-w-72 min-h-48 min-w-72"}>
                <div className={"flex justify-between"}>
                    <div className={"flex items-center"}>
                        <div className={"pl-0 pr-1 text-slate-400"}>
                            <PlusIcon size={"md"}/>
                        </div>
                        <div className={"text-sm flex items-center"}>{props.title}</div>
                    </div>
                    <div className={"flex items-center"}>
                        <div className={"pr-2 text-slate-400"}>
                            <ShareIcon size={"md"}/>
                        </div>
                        <div className={"text-slate-400"}>
                            <a href={props.link} target={"_blank"} rel="noopener noreferrer">
                                <ShareIcon size={"md"}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={"pt-4 pb-1"}>
                    {props.type === "youtube" && (
                        <div>
                            <iframe
                                className={"w-full"}
                                src={getYouTubeEmbedURL(props.link)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {props.type === "twitter" && (
                        <div>
                            <blockquote className="twitter-tweet w-full">
                                <a href={props.link.replace("x.com", "twitter.com")}>Tweet Link</a>
                            </blockquote>
                        </div>
                    )}
                </div>
                <div className={"flex gap-4 mt-4"}>
                    <div>
                        <a href={props.link} target={"_blank"} rel="noopener noreferrer" />
                    </div>
                </div>
            </div>
        </div>
    );
};