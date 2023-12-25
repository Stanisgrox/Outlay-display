import { SidenavPoint } from "./iterateables/sidenav-points"

export const Sidenav = () => {

    const Points = ['По проекту', 'Объекты', 'РД', 'МТО', 'СМР', 'График', 'МиМ', 'Рабочие', 'Капвложения', 'Бюджет', 'Финансирование', 'Панорамы', 'Камеры', 'Поручения', 'Контрагенты']

    return (
        <nav className="sidenav flex grow justify-start column bg-med bordered-R">
            <div className="flex sidenav-topsection bordered-B">
                <div>
                    <div className="innactive-text">
                        Название проекта
                    </div>
                    <div className="innactive-text font-small">
                        Аббривеатура
                    </div>
                </div>
                <div>
                    <button>
                        <img src="/assets/arrow-ico.svg" alt="ico" />
                    </button>
                </div>
            </div>
            <div className="grow">
                {Points.map((point) => (
                    <SidenavPoint name = {point} active = {point === 'СМР'? true : false} key={point}/>
                ))}
            </div>
        </nav>
    )
}