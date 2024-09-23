const C1 = ({children}) => {
    console.log('1')

    React.useEffect(() => {
        console.log('2')
    }, [])

    return <>{children}</>
}

const C2 = () => {
    console.log('3')

    React.useEffect(() => {
        console.log('4')
    }, [])

    return <>Lorem ipsum</>
}

export default function App() {
    return(
        <C1>
            <C2 />
        </C1>
    )
}

/**
 * 1
 * 3
 * 2
 * 4
 */