import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PawMark = () => (
    <svg className='brand__mark' viewBox='0 0 64 64' aria-hidden='true' focusable='false'>
        <rect width='64' height='64' rx='14' />
        <g className='brand__paw'>
            <ellipse cx='32' cy='41' rx='12' ry='10' />
            <ellipse cx='18' cy='27' rx='5' ry='6.5' />
            <ellipse cx='46' cy='27' rx='5' ry='6.5' />
            <ellipse cx='26' cy='17' rx='4.5' ry='6' />
            <ellipse cx='38' cy='17' rx='4.5' ry='6' />
        </g>
    </svg>
)

export default function Navbar() {
    const savedCount = useSelector(state => state.savedDogs.length)
    return (
        <header className='site-header'>
            <a className='skip-link' href='#main'>Skip to content</a>
            <div className='site-header__inner'>
                <Link to='/' className='brand'>
                    <PawMark />
                    <span className='brand__name'>Doggo Search</span>
                </Link>
                <nav aria-label='Main' className='site-nav'>
                    <NavLink to='/' end>Search</NavLink>
                    <NavLink to='/saved-dogs'>
                        Saved dogs <span className='badge' aria-hidden='true'>{savedCount}</span>
                        <span className='visually-hidden'>({savedCount} saved)</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
