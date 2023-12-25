export const Header = () => {
    return (
        <nav className="navbar bordered-B flex justify-start bg-med">
            <button className="navbar-button">
                <img src="/assets/menu-ico.svg" alt="ico" />
            </button>
            <button className="navbar-button">
                <img src="/assets/back-ico.svg" alt="ico" />
            </button>
            <button className="navbar-tab navbar-tab-active">
                Просмотр
            </button>
            <button className="innactive-text navbar-tab">
                Управление
            </button>
        </nav>
    )
}