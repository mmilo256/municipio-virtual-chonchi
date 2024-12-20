import logo from '../../assets/logo.png'
import Container from './Container'

const Footer = () => {
    return (
        <footer className='bg-primary py-6 mt-5'>
            <Container>
                <a href="https://municipalidadchonchi.cl">
                    <img className='h-16' src={logo} alt="logo municipalidad de chonchi" />
                </a>
            </Container>
        </footer>
    )
}

export default Footer