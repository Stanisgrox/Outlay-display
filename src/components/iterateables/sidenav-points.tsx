interface SNProps {
    active?: boolean
    name: string
}

export const SidenavPoint = (props: SNProps) => {
    return (
        <div className = {`sidenav-points flex ${props.active? 'active' : ''}`}>
            <div>
                <img src="/assets/sidenav-ico.svg" alt="ico" />
            </div>
            <div>
                {props.name}
            </div>
        </div>
    )
}