type props = {
    children: React.ReactNode
}

export default function FeedWrapper({
    children
}: props) {
    return <div className="flex-1 relative top-0 pb-10">{children}</div>;
}
