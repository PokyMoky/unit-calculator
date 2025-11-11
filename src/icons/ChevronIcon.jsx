function ChevronIcon({rotated, width = 22, height = 14}) {
    return (
            <svg
                width={width}
                height={height}
                viewBox="0 0 22 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={rotated ? 'chevronRotated' : ''}
            >
                <path d="M2.51465 3L10.9999 11.4853L19.4852 3"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="square"/>
            </svg>
    );
}

export default ChevronIcon;