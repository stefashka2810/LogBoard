interface ButtonProps {
    bgColor:  string;
    borderColor: string;
    textColor: string;
    children: React.ReactNode;
}

const Button = ({bgColor, borderColor, textColor, children}:
                ButtonProps) => {
    return (
        <>
            <button
                style={{
                    background: bgColor,
                    borderColor: borderColor,
                    color: textColor,
                }}
                className="outline-0 w-fit h-fit rounded-3xl py-2 px-4 border"
            >
                {children}
            </button>

        </>
    )
}

export default Button;