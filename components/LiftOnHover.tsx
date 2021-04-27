export default function LiftOnHover({ children }) {
    return (
        <div className="transform hover:-translate-y-2 transition-all duration-200 ease-in-out">
            {children}
        </div>
    )
}
