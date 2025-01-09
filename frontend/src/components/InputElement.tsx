export function InputElement({onChange, placeholder}: { onChange: () => void }) {
    return <div className={"p-3"}>
        <input type={"text"} placeholder={placeholder} className={"px-4 py-2"} onChange={onChange}/>
    </div>
}